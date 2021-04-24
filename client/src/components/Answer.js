import React from "react";
import decypter from "../Utils/decypter";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
const StyledButton = withStyles({
  root: {
    background:
      "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 31%, rgba(0,212,255,1) 100%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: "1em",
  },
  label: {
    textTransform: "capitalize",
  },
  className: "answer",
})(Button);

export default function Answer({
  answer,
  answerClickEvent,
  isAnswerVisible,
  question,
  disableButtons,
}) {
  return (
    <div>
      <StyledButton
        className="answer"
        onClick={(e) => answerClickEvent(e.target.innerText)}
        variant="outlined"
        disabled={disableButtons}
      >
        {answer.option}
      </StyledButton>
      <span>
        {isAnswerVisible && question.user.allAnswers.length === 4
          ? decypter(answer.answer)
          : isAnswerVisible &&
            question.user.allAnswers.length === 2 &&
            question.saved == null
          ? decypter(answer.answer) + " " + answer.country
          : isAnswerVisible &&
            question.user.allAnswers.length === 2 &&
            question.saved
          ? decypter(answer.answer)
          : null}
      </span>
    </div>
  );
}
