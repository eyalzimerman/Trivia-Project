import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import axios from "axios";
import decypter from "../Utils/decypter";

export default function Grading({
  onRateOrSkipClicking,
  question,
  questionNumber,
  setRatedNewQuestions,
  ratedNewQuestions,
  isAnswerCorrect,
}) {
  const [value, setValue] = useState(0);

  const questionToSave = Object.assign({}, question);

  // Func after clicking on rate, if its saved question - send axios request to update the database
  // If new question that rated save in state to send later
  const onRateHandler = async () => {
    if ((questionNumber - 1) % 3 === 0) {
      try {
        await axios.patch("/api/trivia/update", questionToSave);
      } catch (err) {
        console.log(err);
      }
    } else {
      const temp = [...ratedNewQuestions];
      temp.push(questionToSave);
      setRatedNewQuestions(temp);
    }
  };

  // Use effect that listen to click on rate
  useEffect(() => {
    if (value !== 0) {
      questionToSave.answer = decypter(questionToSave.answer);
      if (questionToSave.user.allAnswers.length === 4) {
        questionToSave.user.allAnswers[0].answer = decypter(
          questionToSave.user.allAnswers[0].answer
        );
        questionToSave.user.allAnswers[1].answer = decypter(
          questionToSave.user.allAnswers[1].answer
        );
        questionToSave.user.allAnswers[2].answer = decypter(
          questionToSave.user.allAnswers[2].answer
        );
        questionToSave.user.allAnswers[3].answer = decypter(
          questionToSave.user.allAnswers[3].answer
        );
      } else {
        questionToSave.user.allAnswers[0].answer = decypter(
          questionToSave.user.allAnswers[0].answer
        );
        questionToSave.user.allAnswers[1].answer = decypter(
          questionToSave.user.allAnswers[1].answer
        );
      }
      questionToSave.grade = value;
      onRateHandler();
      onRateOrSkipClicking();
    }
  }, [value]);
  return (
    <div id="rating-background">
      <div id="rating-container">
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography id="rate-question" component="legend">
            {isAnswerCorrect}
            <br /> Rate Question:
          </Typography>
          <Rating
            id="stars"
            size="large"
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onRateOrSkipClicking}
          id="skip-button"
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
