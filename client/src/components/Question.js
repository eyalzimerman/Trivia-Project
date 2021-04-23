import React from "react";

export default function Question({ question }) {
  return <div>{question.user ? <h1>{question.user.question}</h1> : null}</div>;
}
