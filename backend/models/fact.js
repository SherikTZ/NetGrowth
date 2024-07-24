import mongoose from "mongoose";

const factSchema = new mongoose.Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Fact", factSchema);
