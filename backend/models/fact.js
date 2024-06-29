const mongoose = require("mongoose");

const factSchema = new mongoose.Schema({
  body: { type: String, required: true },
});

module.exports = mongoose.model("Fact", factSchema);
