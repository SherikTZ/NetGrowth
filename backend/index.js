const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const mainRouter = require("./routes/main");
const userRouter = require("./routes/register");

app.use(express.json());
app.use("/", mainRouter);
app.use("/", userRouter);
dotenv.config();

const { user, connection, fact } = require("./models/index");

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

module.exports = app;
