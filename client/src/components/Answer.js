import React from "react";
import decypter from "../Utils/decypter";

export default function Answer({
  answer,
  answerClickEvent,
  isAnswerVisible,
  question,
}) {
  return (
    <div onClick={(e) => answerClickEvent(e.target.innerText)}>
      {answer.option}{" "}
      <span>
        {isAnswerVisible && question.user.allAnswers.length === 4
          ? decypter(answer.answer)
          : isAnswerVisible && question.user.allAnswers.length === 2
          ? decypter(answer.answer) + " " + answer.country
          : null}
      </span>
    </div>
  );
}
