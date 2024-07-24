import request from "supertest";
import app from "../../index.js";

import Connection from "../../models/connection.js";
import Fact from "../../models/fact.js";
import User from "../../models/user.js";

import { expect } from "chai";

beforeEach(async () => {
  await Connection.deleteMany({});
  await User.deleteMany({});
  await Fact.deleteMany({});
});

afterEach(async () => {
  await Connection.deleteMany({});
  await User.deleteMany({});
  await Fact.deleteMany({});
});

describe("POST /api/connectionFacts/:id/post", () => {
  it("should add connection facts with valid data", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const connection = new Connection({
      name: "Test Connection",
      position: "Test Position",
      type: "Mentor",
      userId: user._id,
    });

    const connection2 = new Connection({
      name: "Test Connection 2",
      position: "Test Position 2",
      type: "Mentor",
      userId: user._id,
    });

    await connection.save();
    await connection2.save();

    const fact = new Fact({
      name: "Test Fact",
      body: "This is a test fact.",
      date: "2024-07-23T00:00:00Z",
      userId: user._id,
    });

    const fact2 = new Fact({
      name: "Test Fact 2",
      body: "This is another test fact.",
      date: "2024-07-23T00:00:00Z",
      userId: user._id,
    });

    await fact.save();
    await fact2.save();

    const res = await request(app)
      .post(`/api/connectionFacts/${user._id}/post`)
      .send()
      .expect(200);
  });
});

describe("GET /api/connectionFacts/:id/get", () => {
  it("should return a user's connection facts", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const connection = new Connection({
      name: "Test Connection",
      position: "Test Position",
      type: "Mentor",
      userId: user._id,
    });

    const connection2 = new Connection({
      name: "Test Connection 2",
      position: "Test Position 2",
      type: "Mentor",
      userId: user._id,
    });

    await connection.save();
    await connection2.save();

    const fact = new Fact({
      name: "Test Fact",
      body: "This is a test fact.",
      date: "2024-07-23T00:00:00Z",
      userId: user._id,
    });

    const fact2 = new Fact({
      name: "Test Fact 2",
      body: "This is another test fact.",
      date: "2024-07-23T00:00:00Z",
      userId: user._id,
    });

    await fact.save();
    await fact2.save();

    user.connections.push(connection);
    user.facts.push(fact);
    user.connections.push(connection2);
    user.facts.push(fact2);

    await user.save();

    const postRes = await request(app)
      .post(`/api/connectionFacts/${user._id}/post`)
      .send();

    expect(postRes.status).to.equal(200);

    const getRes = await request(app)
      .get(`/api/connectionFacts/${user._id}/get`)
      .expect(200);
    expect(getRes.body).to.be.an("array");
    expect(getRes.body.length).to.be.greaterThan(0);
  });
});

describe("PATCH /api/connectionFacts/:id/patch", () => {
  it("should update a connection fact", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const connection = new Connection({
      name: "Test Connection",
      position: "Test Position",
      type: "Mentor",
      userId: user._id,
    });

    await connection.save();

    const fact = new Fact({
      name: "Test Fact",
      body: "This is a test fact.",
      date: "2024-07-23T00:00:00Z",
      userId: user._id,
    });

    await fact.save();

    user.connections.push(connection);
    user.facts.push(fact);

    await user.save();

    await request(app).post(`/api/connectionFacts/${user._id}/post`).send();

    const res = await request(app)
      .patch(`/api/connectionFacts/${user._id}/patch`)
      .send({
        connectionId: connection._id,
        factId: fact._id,
      });

    expect(res.body.message).to.equal("Connection fact updated");
  });
});

describe("DELETE /api/connectionFacts/:id/delete", () => {
  it("should delete a connection fact", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const connection = new Connection({
      name: "Test Connection",
      position: "Test Position",
      type: "Mentor",
      userId: user._id,
    });

    await connection.save();

    const fact = new Fact({
      name: "Test Fact",
      body: "This is a test fact.",
      date: "2024-07-23T00:00:00Z",
      userId: user._id,
    });

    await fact.save();

    user.connections.push(connection);

    user.facts.push(fact);

    await user.save();

    await request(app).post(`/api/connectionFacts/${user._id}/post`).send();

    const res = await request(app)
      .delete(`/api/connectionFacts/${user._id}/delete`)
      .send({
        connectionId: connection._id,
        factId: fact._id,
      });

    expect(res.body.message).to.equal("Connection fact deleted successfully");
  });
});
