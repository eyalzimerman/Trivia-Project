import React from "react";
import Button from "@material-ui/core/Button";
import decypter from "../Utils/decypter";
import HelpIcon from "@material-ui/icons/Help";

export default function LifeSaver({
  question,
  setLifeSaver,
  lifeSaver,
  setQuestion,
  setCounter,
  disableSaveButton,
  setProgress,
  counter,
  prevCounter,
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
    if (counter + 10 > prevCounter) {
      setCounter(prevCounter);
      setProgress(100);
    } else {
      setCounter((prev) => (prev += 10));
      setProgress(
        (prev) =>
          (prev += 20 * (100 / (prevCounter * 2))) + 100 / (prevCounter * 2)
      );
    }
    setLifeSaver((prev) => prev - 1);
    removeFromAnswers();
  };

  return (
    <div id="life-saver-container">
      {lifeSaver > 0 ? (
        <div className="life-saver-message">
          you have {lifeSaver} life savers
        </div>
      ) : (
        <div className="life-saver-message">You used two life savers</div>
      )}
      {length === 4 && lifeSaver > 0 ? (
        <Button
          disabled={disableSaveButton}
          variant="contained"
          onClick={() => onClickHandler()}
          id="life-saver-button"
        >
          <HelpIcon />
        </Button>
      ) : null}
    </div>
  );
}
