import User from "../models/user.js";

const getConnectionFacts = async (req, res) => {
  id = req.params.id;

  try {
    const user = await User.findById(id).select("connectionsFacts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.connectionsFacts);
  } catch (error) {
    console.error("Error fetching connection facts", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addConnectionFacts = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id)
      .populate("connections")
      .populate("facts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const connection of user.connections) {
      for (const fact of user.facts) {
        const existingConnectionFact = user.connectionsFacts.find(
          (cf) =>
            cf.connection.toString() === connection._id.toString() &&
            cf.fact.toString() === fact._id.toString()
        );

        if (!existingConnectionFact) {
          user.connectionsFacts.push({
            connection: connection._id,
            fact: fact._id,
            isFullfilled: false,
          });
        }
      }
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Connection facts added successfully" });
  } catch (error) {
    console.error("Error adding connection facts", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateConnectionFacts = async (req, res) => {
  const connectionId = req.body.connectionId;
  const factId = req.body.factId;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const connectionFact = user.connectionsFacts.find(
      (cf) =>
        cf.connection.toString() === connectionId &&
        cf.fact.toString() === factId
    );

    if (!connectionFact) {
      return res.status(404).json({ message: "Connection fact not found" });
    }

    connectionFact.isFullfilled = !connectionFact.isFullfilled;

    await user.save();

    return res.status(200).json({ message: "Connection fact updated" });
  } catch (error) {
    console.error("Error updating connection facts", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteConnectionFacts = async (req, res) => {
  const { connectionId, factId } = req.body;
  const userId = req.params.id;
  try {
    const result = await User.updateOne(
      { _id: userId },
      {
        $pull: { connectionsFacts: { connection: connectionId, fact: factId } },
      }
    );
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Connection fact not found or already deleted" });
    }
    return res
      .status(200)
      .json({ message: "Connection fact deleted successfully" });
  } catch (error) {
    console.error("Error deleting connection facts", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default {
  getConnectionFacts,
  addConnectionFacts,
  updateConnectionFacts,
  deleteConnectionFacts,
};
