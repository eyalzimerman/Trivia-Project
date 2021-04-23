import React, { useEffect, useState } from "react";
import decypter from "../Utils/decypter";
import axios from "axios";
import Answer from "./Answer";
import Question from "./Question";
import Rating from "./Rating";

export default function Game() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState({});
  const [counter, setCounter] = useState(20);
  const [isRatingVisible, setIsRatingVisible] = useState(false);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    (async () => {
      const num = Math.floor(Math.random() * 3) + 1;
      const res = await axios.get(`/api/trivia/type${num}`);
      console.log(res.data);
      setQuestion(res.data);
    })();
  }, []);

  const answerClickEvent = (value) => {
    const answer = decypter(question.answer);
    console.log(answer);
    if (answer === value) {
      console.log("success");
    } else {
      console.log("Big fail");
    }
    setCounter(0);
  };

  return (
    <div>
      <div>{counter}</div>
      <Question question={question} />
      {question.user &&
        question.user.allAnswers.map((answer, i) => {
          return (
            <Answer
              key={`answer key ${i}`}
              answer={answer}
              answerClickEvent={answerClickEvent}
            />
          );
        })}
      {isRatingVisible ? <Rating /> : null}
    </div>
  );
}
