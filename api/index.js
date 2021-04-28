const { Router } = require("express");
const trivia = require("./trivia");
const users = require("./users");
const jwt = require("jsonwebtoken");

const api = Router();

const cookieValidator = (req, res, next) => {
  let token = req.cookies["Access-Token"];
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
  token = token.slice(7);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token" });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

api.use("/trivia", cookieValidator, trivia);
api.use("/users", users);

module.exports = api;
