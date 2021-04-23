import React from "react";

export default function Answer({ answer, answerClickEvent }) {
  return (
    <div onClick={(e) => answerClickEvent(e.target.innerText)}>
      {answer.option}
    </div>
  );
}
