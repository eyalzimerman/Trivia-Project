require("dotenv").config();
const { hashSync, compareSync, genSaltSync } = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  createUser,
  addScore,
  checkUserExist,
  findUser,
} = require("../DB/questionQueries");

// create json web token
const createAccessToken = (user) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// create refresh json web token
const createRefreshToken = (user) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
};

router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const doesExist = await checkUserExist(req.body);
  if (doesExist) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = hashSync(password, genSaltSync(10));
  try {
    await createUser({ name: name, password: hashedPassword });
  } catch (error) {
    return res.status(500).json({ error: "Could not add user" });
  }

  const accessToken = createAccessToken(req.body);
  const refreshToken = createRefreshToken(req.body);
  res.cookie("Access-Token", `Bearer ${accessToken}`);
  res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
  return res.status(200).json({ message: "User created successfully" });
});

// User login
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const doesExist = await checkUserExist(req.body);
  if (!doesExist) {
    return res.status(400).json({ error: "Username or password is incorrect" });
  }
  const user = await findUser(name);
  const isPasswordCorrect = compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Username or password is incorrect" });
  } else {
    const accessToken = createAccessToken(req.body);
    const refreshToken = createRefreshToken(req.body);
    res.cookie("Access-Token", `Bearer ${accessToken}`);
    res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
    return res.status(200).json({ message: "login successfully" });
  }
});

// Adds user with score to scoreboard
router.post("/score", async (req, res) => {
  const { id, name, score } = req.body;
  try {
    await addScore({ id, name, score });
    return res.status(200).json({ message: "Score added" });
  } catch (error) {
    return res.status(500).json({ error: "Could not add score" });
  }
});

module.exports = router;
