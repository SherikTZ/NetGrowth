import request from "supertest";
import express from "express";
import { expect } from "chai";
import validatePassword from "../../middlewares/validatePassword.js";

describe("Password Validator Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Ensure JSON body parsing is enabled
    app.post("/test", validatePassword, (req, res) => {
      res.send("Password validated");
    });
  });

  it("should return 400 if password is not provided", async () => {
    const res = await request(app).post("/test").send({}).expect(400);
    expect(res.body.message).to.equal("Password is required");
  });

  it("should return 400 if password is less than 8 characters", async () => {
    const res = await request(app)
      .post("/test")
      .send({ password: "Pass1!" })
      .expect(400);
    expect(res.body.message).to.equal(
      "Password must be at least 8 characters long"
    );
  });

  it("should return 400 if password does not contain an uppercase letter", async () => {
    const res = await request(app)
      .post("/test")
      .send({ password: "password1!" })
      .expect(400);
    expect(res.body.message).to.equal(
      "Password must contain at least one uppercase letter"
    );
  });

  it("should return 400 if password does not contain a lowercase letter", async () => {
    const res = await request(app)
      .post("/test")
      .send({ password: "PASSWORD1!" })
      .expect(400);
    expect(res.body.message).to.equal(
      "Password must contain at least one lowercase letter"
    );
  });

  it("should return 400 if password does not contain a number", async () => {
    const res = await request(app)
      .post("/test")
      .send({ password: "Password!" })
      .expect(400);
    expect(res.body.message).to.equal(
      "Password must contain at least one number"
    );
  });

  it("should return 400 if password does not contain a special character", async () => {
    const res = await request(app)
      .post("/test")
      .send({ password: "Password1" })
      .expect(400);
    expect(res.body.message).to.equal(
      "Password must contain at least one special character"
    );
  });

  it("should call next if password is valid", async () => {
    const res = await request(app)
      .post("/test")
      .send({ password: "Password1!" })
      .expect(200);
    expect(res.text).to.equal("Password validated");
  });
});
