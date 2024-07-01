import request from "supertest";
import app from "../../index.js";
import User from "../../models/user.js";
import { expect } from "chai";

beforeEach(async () => {
  await User.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("POST /register", () => {
  it("should register a new user", async () => {
    const newUser = {
      username: "test",
      email: "test@example.com",
      password: "TestPassword1!",
    };

    const res = await request(app).post("/register").send(newUser).expect(201);

    expect(res.body.message).to.equal("User registered successfully");
  });

  it("should not register a user with an existing email", async () => {
    const existingUser = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await existingUser.save();

    const newUser = {
      username: "test2",
      email: "test@example.com",
      password: "TestPassword1!",
    };

    const res = await request(app).post("/register").send(newUser).expect(409);

    expect(res.body.message).to.equal("User already exists");
  });

  it("should not register a user with an existing username", async () => {
    const existingUser = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await existingUser.save();

    const newUser = {
      username: "test",
      email: "test2@example.com",
      password: "TestPassword1!",
    };

    const res = await request(app).post("/register").send(newUser).expect(409);

    expect(res.body.message).to.equal("User already exists");
  });
});
