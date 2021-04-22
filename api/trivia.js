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
  addSavedQuestion,
  updateSavedQuestion,
  createUser,
  getOrderedScoreboard,
} = require("../DB/questionQueries");

// GET type1 question method
router.get("/type1", async (req, res) => {
  try {
    const questionWithAnswer = await typeOne();
    console.log(questionWithAnswer);
    const encryptedArr = questionWithAnswer.allAnswers.map((question) => {
      return {
        option: question.country,
        answer: cryptr.encrypt(question.answer),
      };
    });
    const encryptedAnswer = cryptr.encrypt(questionWithAnswer.answer);
    const obj = {
      user: {
        question: questionWithAnswer.question,
        allAnswers: encryptedArr,
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
    const encryptedArr = questionWithAnswer.allAnswers.map((question) => {
      return {
        option: question.option,
        answer: cryptr.encrypt(question.answer),
      };
    });
    const obj = {
      user: {
        question: questionWithAnswer.question,
        allAnswers: encryptedArr,
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
    const encryptedArr = questionWithAnswer.countries.map((question) => {
      return {
        country: question.country,
        answer: cryptr.encrypt(question.answer),
      };
    });
    const obj = {
      user: {
        question: questionWithAnswer.question,
        allAnswers: encryptedArr,
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
        id: questionWithAnswer.id,
        user: {
          question: questionWithAnswer.strQuestion,
          allAnswers: [
            {
              option: questionWithAnswer.option1,
              answer: cryptr.encrypt(questionWithAnswer.answer1),
            },
            {
              option: questionWithAnswer.option2,
              answer: cryptr.encrypt(questionWithAnswer.answer2),
            },
          ],
        },
        answer: encryptedAnswer,
      };
      return res.status(200).json(obj);
    } else {
      const obj = {
        id: questionWithAnswer.id,
        user: {
          question: questionWithAnswer.strQuestion,
          allAnswers: [
            {
              option: questionWithAnswer.option1,
              answer: cryptr.encrypt(questionWithAnswer.answer1),
            },
            {
              option: questionWithAnswer.option2,
              answer: cryptr.encrypt(questionWithAnswer.answer2),
            },
            {
              option: questionWithAnswer.option3,
              answer: cryptr.encrypt(questionWithAnswer.answer3),
            },
            {
              option: questionWithAnswer.option4,
              answer: cryptr.encrypt(questionWithAnswer.answer4),
            },
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

router.get("/scoreboard", async (req, res) => {
  try {
    const scoreboard = await getOrderedScoreboard();
    res.status(200).json(scoreboard);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//POST route

//posts a new question
router.post("/new", async (req, res) => {
  const { body } = req;
  try {
    await addSavedQuestion(body);
    return res.status(200).json({ message: "Saved successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Could not save new question" });
  }
});

//Add new user with score at the end of the game
router.post("/user", async (req, res) => {
  const { body } = req;
  try {
    await createUser(body);
    res.status(200).json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user" });
  }
});

//PATCH Routes

//update saved question with new grade and new amount
router.patch("/update", async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    await updateSavedQuestion(body);
    return res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Could not update saved question" });
  }
});

module.exports = router;
