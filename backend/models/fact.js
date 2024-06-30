import mongoose from "mongoose";

const factSchema = new mongoose.Schema({
  body: { type: String, required: true },
});

export default mongoose.model("Fact", factSchema);
