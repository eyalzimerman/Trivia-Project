import React from "react";
import decypter from "../Utils/decypter";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
const StyledButton = withStyles({
  root: {
    backgroundColor: "#248b77",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 6px 5px 2px rgba(112, 99, 102, 0.568)",
    marginTop: "1em",
    fontSize: "1.5em",
    minWidth: "10em",
    height: "fit-content",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export default function Answer({
  answer,
  answerClickEvent,
  isAnswerVisible,
  question,
  disableButtons,
}) {
  return (
    <div className="option-div">
      <StyledButton
        onClick={(e) => answerClickEvent(e.target.innerText)}
        variant="contained"
        disabled={disableButtons}
      >
        {answer.option}
      </StyledButton>
      <div className="answer">
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
      </div>
    </div>
  );
}
