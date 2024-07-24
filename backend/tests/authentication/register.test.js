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

describe("POST /api/register", () => {
  it("should register a new user", async () => {
    const newUser = {
      username: "test",
      email: "netgrowth@tjpro.net",
      password: "TestPassword1!",
      authProvider: "local",
    };

    const res = await request(app)
      .post("/api/register")
      .send(newUser)
      .expect(201);

    expect(res.body.message).to.equal(
      "User registered successfully. Verification email sent."
    );
  });

  it("should not register a user with an existing email", async () => {
    const existingUser = new User({
      username: "test",
      email: "netgrowth@gtjpro.net",
      passwordHash: "TestPassword1!",
      authProvider: "local",
    });

    await existingUser.save();

    const newUser = {
      username: "test2",
      email: "netgrowth@gtjpro.net",
      password: "TestPassword1!",
      authProvider: "local",
    };

    const res = await request(app)
      .post("/api/register")
      .send(newUser)
      .expect(409);

    expect(res.body.message).to.equal("User already exists");
  });

  it("should not register a user with an existing username", async () => {
    const existingUser = new User({
      username: "test",
      email: "netgrowth@gtjpro.net",
      passwordHash: "TestPassword1!",
      authProvider: "local",
    });

    await existingUser.save();

    const newUser = {
      username: "test",
      email: "netgrowth@gtjpro.net",
      password: "TestPassword1!",
      authProvider: "local",
    };

    const res = await request(app)
      .post("/api/register")
      .send(newUser)
      .expect(409);

    expect(res.body.message).to.equal("User already exists");
  });
});
