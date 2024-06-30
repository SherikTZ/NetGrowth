import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

function generateJWT(user) {
  const payload = { id: user._id };
  return jwt.sign(payload, JWT_SECRET);
}

export default generateJWT;
