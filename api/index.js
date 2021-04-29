const { Router } = require("express");
const trivia = require("./trivia");
const users = require("./users");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("./cookiesUtils");

const api = Router();

const cookieValidator = (req, res, next) => {
  const { body } = req;
  let accessToken = req.cookies["Access-Token"];
  let refreshToken = req.cookies["Refresh-Token"];

  if (!accessToken) {
    return res.status(401).json({ message: "Access Token required" });
  }

  accessToken = accessToken.slice(7);

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token required" });
  }

  refreshToken = refreshToken.slice(7);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.message === "jwt expired") {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, decoded) => {
            if (err) {
              return res.status(403).json({ message: "Invalid access token" });
            } else {
              res.clearCookie("Access-Token");
              const newAccessToken = createAccessToken(body);
              res.cookie("Access-Token", `Bearer ${newAccessToken}`);
              next();
            }
          }
        );
      } else {
        return res.status(403).json({ message: "Invalid access token" });
      }
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

api.use("/trivia", cookieValidator, trivia);
api.use("/users", users);

module.exports = api;
