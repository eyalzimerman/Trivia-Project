require("dotenv").config();
const express = require("express");
const router = express.Router();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

const {
  typeOne,
  typeTwo,
  typeThree,
  savedQuestion,
} = require("../DB/questionQueries");

// GET type1 question method
router.get("/type1", async (req, res) => {
  try {
    const questionWithAnswer = await typeOne();
    const encryptedAnswer = cryptr.encrypt(questionWithAnswer.answer);
    const obj = {
      user: {
        question: questionWithAnswer.question,
        allAnswers: questionWithAnswer.allAnswers,
      },
      answer: encryptedAnswer,
    };
    return res.status(200).json(obj);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET type2 question method
router.get("/type2", async (req, res) => {
  try {
    const questionWithAnswer = await typeTwo();
    const encryptedAnswer = cryptr.encrypt(questionWithAnswer.answer);
    const obj = {
      user: {
        question: questionWithAnswer.question,
        allAnswers: questionWithAnswer.allAnswers,
      },
      answer: encryptedAnswer,
    };
    return res.status(200).json(obj);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET type3 question method
router.get("/type3", async (req, res) => {
  try {
    const questionWithAnswer = await typeThree();
    const encryptedAnswer = cryptr.encrypt(questionWithAnswer.answer);
    const obj = {
      user: {
        question: questionWithAnswer.question,
        allAnswers: questionWithAnswer.allAnswers,
      },
      answer: encryptedAnswer,
    };
    return res.status(200).json(obj);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//get question from the saved questions
router.get("/saved-question", async (req, res) => {
  try {
    const questionWithAnswer = await savedQuestion();
    const encryptedAnswer = cryptr.encrypt(questionWithAnswer.answer);
    if (questionWithAnswer.questionType === 3) {
      const obj = {
        user: {
          question: questionWithAnswer.strQuestion,
          allAnswers: [questionWithAnswer.option1, questionWithAnswer.option2],
        },
        answer: encryptedAnswer,
      };
      return res.status(200).json(obj);
    } else {
      const obj = {
        user: {
          question: questionWithAnswer.strQuestion,
          allAnswers: [
            questionWithAnswer.option1,
            questionWithAnswer.option2,
            questionWithAnswer.option3,
            questionWithAnswer.option4,
          ],
        },
        answer: encryptedAnswer,
      };
      return res.status(200).json(obj);
    }
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//POST route
//posts a new question / update
router.post("/", (req, res) => {});

module.exports = router;
