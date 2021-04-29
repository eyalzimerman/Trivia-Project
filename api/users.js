require("dotenv").config();
const { hashSync, compareSync, genSaltSync } = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken } = require("./cookiesUtils");
const {
  createUser,
  addScore,
  checkUserExist,
  findUser,
} = require("../DB/questionQueries");

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

// Gets a single user
router.post("/getuser", async (req, res) => {
  const { body } = req;
  try {
    const user = await findUser(body.name);
    return res.status(200).json({ name: user.name, id: user.id });
  } catch (error) {
    return res.status(500).json({ error: "User not found" });
  }
});

// User logout
router.post("/logout", async (req, res) => {
  res.clearCookie("Access-Token");
  res.clearCookie("Refresh-Token");
  return res.status(200).json({ message: "success" });
});

module.exports = router;
