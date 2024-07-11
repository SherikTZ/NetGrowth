import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

function generateJWT(user) {
  const payload = { id: user._id };
  return jwt.sign(payload, JWT_SECRET);
}

export default generateJWT;
