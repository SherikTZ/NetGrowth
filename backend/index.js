import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import mainRouter from "./routes/main.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";

import { user, connection, fact } from "./models/index.js";

const app = express();

app.use(express.json());
app.use("/", mainRouter);
app.use("/", registerRouter);
app.use("/", loginRouter);

dotenv.config();

const dbURI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
