import React from "react";
import Button from "@material-ui/core/Button";
import decypter from "../Utils/decypter";

export default function LifeSaver({
  question,
  setLifeSaver,
  lifeSaver,
  setQuestion,
  setCounter,
  disableSaveButton,
}) {
  const length = question.user ? question.user.allAnswers.length : null;

  const removeFromAnswers = () => {
    const temp = Object.assign({}, question);
    const tempAnswers = temp.user.allAnswers.map((answer) => {
      return answer.option;
    });
    const answer = decypter(temp.answer);

    const index = tempAnswers.findIndex((option) => String(option) === answer);
    const indexes = [];
    while (indexes.length < 2) {
      const tempIndex = Math.floor(Math.random() * 4);
      if (tempIndex !== index && !indexes.includes(tempIndex)) {
        indexes.push(tempIndex);
      }
    }

    indexes.sort((a, b) => {
      return a - b;
    });
    temp.user.allAnswers.splice(indexes[0], 1);
    indexes.shift();
    temp.user.allAnswers.splice(indexes[0] - 1, 1);
    temp.saved = true;
    setQuestion(temp);
  };

  const onClickHandler = () => {
    setCounter((prev) => (prev += 10));
    setLifeSaver((prev) => prev - 1);
    removeFromAnswers();
  };

  return (
    <div>
      <div>you have {lifeSaver} life savers left</div>
      {length === 4 && lifeSaver > 0 ? (
        <Button
          disabled={disableSaveButton}
          variant="contained"
          onClick={() => onClickHandler()}
        >
          life saver
        </Button>
      ) : null}
    </div>
  );
}
