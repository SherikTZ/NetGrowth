import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

function decryptJWT(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export default decryptJWT;
