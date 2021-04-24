import React from "react";

export default function Question({ question }) {
  return (
    <div>
      {question.user ? <h1 id="question">{question.user.question}</h1> : null}
    </div>
  );
}
