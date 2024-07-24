import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import verifyRouter from "./routes/verify.js";
import checkAuthRouter from "./routes/checkAuth.js";
import testRoutesRouter from "./routes/testRoutes.js";
import logoutRouter from "./routes/logout.js";
import connectionRouter from "./routes/connections.js";
import factRouter from "./routes/facts.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", verifyRouter);
app.use("/", checkAuthRouter);
app.use("/", testRoutesRouter);
app.use("/", logoutRouter);
app.use("/", connectionRouter);
app.use("/", factRouter);

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
