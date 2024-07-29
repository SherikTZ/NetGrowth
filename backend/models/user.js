import mongoose from "mongoose";

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
    required: function () {
      return this.authProvider === "local";
    },
  },
  authProvider: {
    type: String,
    enum: ["local", "github", "google", "microsoft"],
    required: true,
    default: "local",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Connection" }],
  facts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fact" }],
  connectionsFacts: [
    {
      connection: { type: mongoose.Schema.Types.ObjectId, ref: "Connection" },
      fact: { type: mongoose.Schema.Types.ObjectId, ref: "Fact" },
      isFullfilled: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("User", userSchema);
