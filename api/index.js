const { Router } = require("express");
const trivia = require("./trivia");
const users = require("./users");
const jwt = require("jsonwebtoken");

const api = Router();

api.use("/trivia", trivia);
api.use("/users", users);

module.exports = api;
