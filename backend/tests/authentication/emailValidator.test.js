import request from "supertest";
import express from "express";
import { expect } from "chai";
import validateEmail from "../../middlewares/validateEmail.js";

describe("Email Validator Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Ensure JSON body parsing is enabled
    app.post("/test", validateEmail, (req, res) => {
      res.send("Email validated");
    });
  });

  it("should return 400 if email is not provided", async () => {
    const res = await request(app).post("/test").send({}).expect(400);
    expect(res.body.message).to.equal("Email is required");
  });

  it("should return 400 if email is invalid", async () => {
    const res = await request(app)
      .post("/test")
      .send({ email: "invalid" })
      .expect(400);
    expect(res.body.message).to.equal("Invalid email format");
  });

  it("should call next if email is valid", async () => {
    const res = await request(app)
      .post("/test")
      .send({ email: "hello@example.com" })
      .expect(200);
    expect(res.text).to.equal("Email validated");
  });
});
