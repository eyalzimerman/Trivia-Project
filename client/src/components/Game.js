import React, { useEffect, useState } from "react";
import decypter from "../Utils/decypter";
import axios from "axios";
import Answer from "./Answer";
import Question from "./Question";

export default function Game() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    (async () => {
      const num = Math.floor(Math.random() * 3) + 1;
      const res = await axios.get(`/api/trivia/type${num}`);
      console.log(res.data);
      setQuestion(res.data);
    })();
  }, []);
  return (
    <div>
      <Question question={question} />
      {question.user &&
        question.user.allAnswers.map((answer, i) => {
          return <Answer key={`answer key ${i}`} answer={answer} />;
        })}
    </div>
  );
}
