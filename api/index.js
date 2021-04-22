const { Router } = require("express");
const trivia = require("./trivia");

const api = Router();

api.use("/trivia", trivia);

module.exports = api;
