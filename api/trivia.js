require("dotenv").config();
const express = require("express");
const router = express.Router();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

const encryptedString = cryptr.encrypt("bacon");
const decryptedString = cryptr.decrypt(encryptedString);

const {
  typeOne,
  typeTwo,
  typeThree,
  savedQuestion,
} = require("../DB/questionQueries");

// GET type1 question method
router.get("/type1", async (req, res) => {
  const questionWithAnswer = await typeOne();
  const { answer } = questionWithAnswer;
  console.log(answer);
  const encryptedAnswer = cryptr.encrypt(answer);
  console.log(encryptedAnswer);
  const decryptedAnswer = cryptr.decrypt(encryptedAnswer);
  console.log(decryptedAnswer);
  res.json(questionWithAnswer);
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

router.get("/saved-question", async (req, res) => {
  try {
    const question = await savedQuestion();
    if (question.questionType === 3) {
      return res.json({
        question: question.strQuestion,
        option1: question.option1,
        option2: question.option2,
      });
    } else {
      return res.json({
        question: question.strQuestion,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
