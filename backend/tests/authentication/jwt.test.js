import generateJWT from "../../utils/generateJWT.js";
import { expect } from "chai";
import jwt from "jsonwebtoken";

describe("Generate JWT", () => {
  it("should generate a JWT", () => {
    const user = {
      _id: "12345",
    };

    const token = generateJWT(user);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded).to.have.property("id", user._id);
  });
});
