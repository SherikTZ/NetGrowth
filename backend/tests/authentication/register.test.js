const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index");
const User = require("../../models/user");
const chai = require("chai");
const dotenv = require("dotenv");

dotenv.config("../../.env");

afterEach((done) => {
  User.deleteMany({})
    .then(() => done())
    .catch((err) => done(err));
});

describe("POST /register", () => {
  it("should register a new user", (done) => {
    const newUser = {
      username: "test",
      email: "test@example.com",
      password: "password123",
    };

    request(app)
      .post("/register")
      .send(newUser)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        chai.expect(res.body.message).to.equal("User registered successfully");
        done();
      });
  });

  it("should not register a user with an existing email", (done) => {
    const existingUser = new User({
      username: "test",
      email: "test@example.com",
      password: "password123",
    });

    existingUser.save().then(() => {
      const newUser = {
        username: "test2",
        email: "test@example.com",
        password: "password123",
      };

      request(app)
        .post("/register")
        .send(newUser)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          chai.expect(res.body.message).to.equal("User already exists");
          done();
        });
    });
  });
  it("should not register a user with an existing username", (done) => {
    const existingUser = new User({
      username: "test",
      email: "test@example.com",
      password: "password123",
    });

    existingUser.save().then(() => {
      const newUser = {
        username: "test",
        email: "test2@example.com",
        password: "password123",
      };

      request(app)
        .post("/register")
        .send(newUser)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          chai.expect(res.body.message).to.equal("User already exists");
          done();
        });
    });
  });
});
