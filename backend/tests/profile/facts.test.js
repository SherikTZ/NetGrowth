import request from "supertest";
import app from "../../index.js";
import Fact from "../../models/fact.js";
import User from "../../models/user.js";
import { expect } from "chai";

beforeEach(async () => {
  await User.deleteMany({});
  await Fact.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
  await Fact.deleteMany({});
});

describe("POST /api/facts/:id/post", () => {
  it("should save a fact with valid data", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const factData = {
      name: "Test Fact",
      body: "This is a test fact.",
      date: "2024-07-23T00:00:00Z",
      userId: user._id,
    };

    const res = await request(app)
      .post(`/api/facts/${user._id}/post`)
      .send(factData)
      .expect(201);

    const fact = await Fact.findById(res.body._id);

    expect(fact).to.exist;
    expect(fact.name).to.equal("Test Fact");
    expect(fact.body).to.equal("This is a test fact.");
    expect(new Date(fact.date).toISOString()).to.equal(
      "2024-07-23T00:00:00.000Z"
    );
  });
});

describe("GET /api/facts/:id/get", () => {
  it("should return a user's facts", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const fact = new Fact({
      name: "Test Fact",
      body: "This is a test fact.",
      date: "2024-07-23T00:00:00Z",
    });

    await fact.save();

    user.facts.push(fact);

    await user.save();

    const res = await request(app)
      .get(`/api/facts/${user._id}/get`)
      .expect(200);

    expect(res.body).to.be.an("array");
    expect(res.body[0].name).to.equal("Test Fact");
    expect(res.body[0].body).to.equal("This is a test fact.");
    expect(new Date(res.body[0].date).toISOString()).to.equal(
      "2024-07-23T00:00:00.000Z"
    );
  });
});

describe("DELETE /api/facts/:id/delete", () => {
  it("should delete a fact", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const fact = new Fact({
      name: "Test Fact",
      body: "This is a test fact.",
      date: "2024-07-23T00:00:00Z",
    });

    await fact.save();

    const factData = {
      factId: fact._id,
    };

    const res = await request(app)
      .delete(`/api/facts/${user._id}/delete`)
      .send(factData)
      .expect(200);

    const deletedFact = await Fact.findById(fact._id);
    expect(deletedFact).to.be.null;
  });
});
