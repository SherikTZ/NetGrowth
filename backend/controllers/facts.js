import User from "../models/user.js";
import Fact from "../models/fact.js";

const getFacts = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const facts = [];
    for (const factId of user.facts) {
      const fact = await Fact.findById(factId);
      if (fact) {
        facts.push(fact);
      }
    }

    return res.status(200).json(facts);
  } catch (error) {
    console.error("Error fetching facts", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addFact = async (req, res) => {
  const { name, body, date, userId } = req.body;

  try {
    const fact = await Fact.create({ name, body, date });
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.facts.push(fact);

    await user.save();

    return res.status(201).json(fact);
  } catch (error) {
    console.error("Error adding fact", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteFact = async (req, res) => {
  const { factIds } = req.body;

  try {
    for (const factId of factIds) {
      await Fact.deleteOne({ _id: factId });
    }

    return res.status(200).json({ message: "Facts deleted" });
  } catch (error) {
    console.error("Error deleting fact", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { getFacts, addFact, deleteFact };
