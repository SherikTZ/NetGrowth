import request from "supertest";
import app from "../../index.js";
import Connection from "../../models/connection.js";
import User from "../../models/user.js";
import { expect } from "chai";

beforeEach(async () => {
  await User.deleteMany({});
  await Connection.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
  await Connection.deleteMany({});
});

describe("POST /api/connections/:id/post", () => {
  it("should save a connection with valid data", async () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      passwordHash: "TestPassword1!",
    });

    await user.save();

    const connectionData = {
      name: "Test Connection",
      position: "Test Position",
      type: "Mentor",
      userId: user._id,
    };

    const res = await request(app)
      .post(`/api/connections/${user._id}/post`)
      .send(connectionData)
      .expect(201);

    const connection = await Connection.findById(res.body._id);

    expect(connection).to.exist;
    expect(connection.name).to.equal("Test Connection");
    expect(connection.position).to.equal("Test Position");
    expect(connection.type).to.equal("Mentor");
  });
  it("should fail to save a connection with wrong type", async () => {
    const connection = new Connection({
      name: "Test Connection",
      position: "Test Position",
      type: "WrongType",
    });

    try {
      await connection.save();
      throw new Error("Connection with wrong type should not be saved");
    } catch (err) {
      expect(err).to.exist;
      expect(err.name).to.equal("ValidationError");
    }
  });
});

describe("GET /api/connections/:id/get", () => {
  it("should return a user's connections", async () => {
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
    });

    await connection.save();

    user.connections.push(connection);

    await user.save();

    const res = await request(app)
      .get(`/api/connections/${user._id}/get`)
      .expect(200);

    expect(res.body).to.be.an("array");
    expect(res.body[0].name).to.equal("Test Connection");
    expect(res.body[0].position).to.equal("Test Position");
    expect(res.body[0].type).to.equal("Mentor");
  });
});

describe("DELETE /api/connections/:id/delete", () => {
  it("should delete a connection", async () => {
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
    });

    await connection.save();

    const connectionData = {
      connectionId: connection._id,
    };

    const res = await request(app)
      .delete(`/api/connections/${user._id}/delete`)
      .send(connectionData)
      .expect(200);
  });
});
