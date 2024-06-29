const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Colleague",
      "Mentor",
      "Mentee",
      "Industry Peer",
      "Classmate",
      "Former Classmate",
      "Networking Contact",
      "Industry Influencer or Leader",
      "Academic Contact",
    ],
    required: true,
  },
  contactDates: { type: [Date] },
});

module.exports = mongoose.model("Connection", connectionSchema);
