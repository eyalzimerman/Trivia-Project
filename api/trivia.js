require("dotenv").config();
const express = require("express");
const router = express.Router();

const { typeOne, typeTwo, typeThree } = require("../DB/questionQueries");

// GET type1 question method
router.get("/type1", async (req, res) => {
  const question = await typeOne();
  res.json(question);
});

// GET type2 question method
router.get("/type2", async (req, res) => {
  const question = await typeTwo();
  res.json(question);
});

// GET type3 question method
router.get("/type3", async (req, res) => {
  const question = await typeThree();
  res.json(question);
});

module.exports = router;
