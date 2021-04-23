require("dotenv").config();
const express = require("express");
const router = express.Router();
const base64 = require("base-64");
const utf8 = require("utf8");

const encrypt = (str) => {
  const bytes = utf8.encode(str);
  const encoded = base64.encode(bytes);
  return encoded;
};

const {
  typeOne,
  typeTwo,
  typeThree,
  savedQuestion,
  addSavedQuestion,
  updateSavedQuestion,
  createUser,
  getOrderedScoreboard,
  allSavedQuestions,
} = require("../DB/questionQueries");

//GET Routes--------------------------------------------------------------------------

// GET type1 question method
router.get("/type1", async (req, res) => {
  try {
    const questionWithAnswer = await typeOne();
    console.log(questionWithAnswer);
    const encryptedArr = questionWithAnswer.allAnswers.map((question) => {
      return {
        option: question.country,
        answer: encrypt(String(question.answer)),
      };
    });
    const encryptedAnswer = encrypt(String(questionWithAnswer.answer));
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
    const encryptedAnswer = encrypt(String(questionWithAnswer.answer));
    const encryptedArr = questionWithAnswer.allAnswers.map((question) => {
      return {
        option: question.option,
        answer: encrypt(String(question.answer)),
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
    const encryptedAnswer = encrypt(String(questionWithAnswer.answer));
    const encryptedArr = questionWithAnswer.countries.map((question, i) => {
      if (i === 0) {
        if (questionWithAnswer.answer === "Yes") {
          return {
            country: question.country,
            option: "Yes",
            answer: encrypt(String(question.answer)),
          };
        } else {
          return {
            country: questionWithAnswer.countries[1].country,
            option: "Yes",
            answer: encrypt(String(questionWithAnswer.countries[1].answer)),
          };
        }
      } else {
        if (questionWithAnswer.answer === "Yes") {
          return {
            country: question.country,
            option: "No",
            answer: encrypt(String(question.answer)),
          };
        } else {
          return {
            country: questionWithAnswer.countries[0].country,
            option: "No",
            answer: encrypt(String(questionWithAnswer.countries[0].answer)),
          };
        }
      }
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

//Get question from the saved questions
router.get("/saved-question", async (req, res) => {
  try {
    const questionWithAnswer = await savedQuestion();
    console.log(questionWithAnswer);
    const encryptedAnswer = encrypt(questionWithAnswer.answer);
    if (questionWithAnswer.questionType === 3) {
      let obj;
      if (
        Number(questionWithAnswer.answer1) > Number(questionWithAnswer.answer2)
      ) {
        obj = {
          id: questionWithAnswer.id,
          user: {
            question: questionWithAnswer.strQuestion,
            allAnswers: [
              {
                country: questionWithAnswer.option1,
                option: "Yes",
                answer: encrypt(questionWithAnswer.answer1),
              },
              {
                country: questionWithAnswer.option2,
                option: "No",
                answer: encrypt(questionWithAnswer.answer2),
              },
            ],
          },
          answer: encryptedAnswer,
        };
      } else {
        obj = {
          id: questionWithAnswer.id,
          user: {
            question: questionWithAnswer.strQuestion,
            allAnswers: [
              {
                country: questionWithAnswer.option2,
                option: "Yes",
                answer: encrypt(questionWithAnswer.answer2),
              },
              {
                country: questionWithAnswer.option1,
                option: "No",
                answer: encrypt(questionWithAnswer.answer1),
              },
            ],
          },
          answer: encryptedAnswer,
        };
      }
      return res.status(200).json(obj);
    } else {
      const obj = {
        id: questionWithAnswer.id,
        user: {
          question: questionWithAnswer.strQuestion,
          allAnswers: [
            {
              option: questionWithAnswer.option1,
              answer: encrypt(questionWithAnswer.answer1),
            },
            {
              option: questionWithAnswer.option2,
              answer: encrypt(questionWithAnswer.answer2),
            },
            {
              option: questionWithAnswer.option3,
              answer: encrypt(questionWithAnswer.answer3),
            },
            {
              option: questionWithAnswer.option4,
              answer: encrypt(questionWithAnswer.answer4),
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

//Gets the scoreboard
router.get("/scoreboard", async (req, res) => {
  try {
    const scoreboard = await getOrderedScoreboard();
    res.status(200).json(scoreboard);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all-saved-questions", async (req, res) => {
  try {
    const allQuestions = await allSavedQuestions();
    res.status(200).json(allQuestions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//POST Routes--------------------------------------------------------------------------

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

//PATCH Routes--------------------------------------------------------------------------

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
