const jwt = require("jsonwebtoken");

// Create json web token
const createAccessToken = (user) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// Create refresh json web token
const createRefreshToken = (user) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { createAccessToken, createRefreshToken };
