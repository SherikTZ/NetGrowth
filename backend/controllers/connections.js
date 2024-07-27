import User from "../models/user.js";
import Connection from "../models/connection.js";

const getConnections = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const connections = [];
    for (const connectionId of user.connections) {
      const connection = await Connection.findById(connectionId);
      if (connection) {
        connections.push(connection);
      }
    }

    return res.status(200).json(connections);
  } catch (error) {
    console.error("Error fetching connections", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addConnection = async (req, res) => {
  const { name, position, type } = req.body;
  const userId = req.params.id;

  try {
    const connection = await Connection.create({ name, position, type });
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.connections.push(connection);

    await user.save();

    return res.status(201).json(connection);
  } catch (error) {
    console.error("Error adding connection", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteConnection = async (req, res) => {
  const { connectionIds } = req.body;

  try {
    for (const connectionId of connectionIds) {
      await Connection.deleteOne({ _id: connectionId });
    }

    return res.status(200).json({ message: "Connections deleted" });
  } catch (error) {
    console.error("Error deleting connections", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { getConnections, addConnection, deleteConnection };
