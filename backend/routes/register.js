const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");

router.get("/register", (req, res) => {
  res.send("Registration");
});

router.post("/register", registerController.register);

module.exports = router;
