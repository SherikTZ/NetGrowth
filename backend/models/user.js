const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Connection" }],
  facts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fact" }],
  connectionsFacts: [
    {
      connection: { type: mongoose.Schema.Types.ObjectId, ref: "Connection" },
      fact: { type: mongoose.Schema.Types.ObjectId, ref: "Fact" },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
