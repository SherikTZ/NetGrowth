import request from "supertest";
import app from "../../index.js";
import User from "../../models/user.js";
import { expect } from "chai";
import bcrypt from "bcryptjs";

const PASSWORD_SALT = 10;

beforeEach(async () => {
  await User.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("POST /login", () => {
  it("should login existing user", async () => {
    const PASSWORD_SALT = 10;

    const passwordHash = await bcrypt.hash("password123", PASSWORD_SALT);

    const newUser = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: passwordHash,
    });

    await newUser.save();

    const user = {
      email: "test@example.com",
      password: "password123",
    };

    const res = await request(app).post("/login").send(user).expect(200);

    expect(res.body.message).to.equal("User logged in");
  });

  it("should not login with an invalid email", async () => {
    const PASSWORD_SALT = 10;

    const passwordHash = await bcrypt.hash("password123", PASSWORD_SALT);

    const newUser = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: passwordHash,
    });

    await newUser.save();

    const user = {
      email: "invalid@example.com",
      password: "password123",
    };

    const res = await request(app).post("/login").send(user).expect(401);

    expect(res.body.message).to.equal("User not found");
  });

  it("should not login with an invalid password", async () => {
    const PASSWORD_SALT = 10;

    const passwordHash = await bcrypt.hash("password123", PASSWORD_SALT);

    const newUser = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: passwordHash,
    });

    await newUser.save();

    const user = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    const res = await request(app).post("/login").send(user).expect(401);

    expect(res.body.message).to.equal("Invalid password");
  });
});
