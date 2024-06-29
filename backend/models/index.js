const mongoose = require("mongoose");

const user = require("./user");
const connection = require("./connection");
const fact = require("./fact");

module.exports = { user, connection, fact };
