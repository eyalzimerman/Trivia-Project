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
}) {
  const [value, setValue] = useState(0);

  const questionToSave = Object.assign({}, question);
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
      console.log(ratedNewQuestions);
    }
  };
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
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate Question:</Typography>
        <Rating
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
      >
        Skip
      </Button>
    </div>
  );
}
