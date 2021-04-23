import React, { useEffect, useState } from "react";
import decypter from "../Utils/decypter";
import axios from "axios";
import Answer from "./Answer";
import Question from "./Question";
import Grading from "./Grading";

export default function Game() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState({});
  const [counter, setCounter] = useState(20);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [skipOrRate, setSkipOrRate] = useState(0);
  const [prevCounter, setPrevCounter] = useState(20);

  useEffect(() => {
    if (counter === 0) {
      setIsAnswerVisible(true);
      setIsRatingVisible(true);
    } else {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 0.5), 500);
      return () => {
        clearInterval(timer);
      };
    }
  }, [counter]);

  useEffect(() => {
    (async () => {
      const num = Math.floor(Math.random() * 3) + 1;
      const res = await axios.get(`/api/trivia/type${num}`);
      //   console.log(res.data);
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
    setIsAnswerVisible(true);
    setIsRatingVisible(true);
  };

  useEffect(() => {
    setQuestionNumber((prev) => (prev += 1));

    (async () => {
      if (questionNumber % 3 === 0) {
        const res = await axios.get(`/api/trivia/saved-question`);
        console.log(res.data);
        setQuestion(res.data);
      } else {
        const num = Math.floor(Math.random() * 3) + 1;
        const res = await axios.get(`/api/trivia/type${num}`);
        // console.log(res.data);
        setQuestion(res.data);
      }
    })();
  }, [skipOrRate]);

  const onRateOrSkipClicking = () => {
    setSkipOrRate((prev) => prev + 1);
    setIsAnswerVisible(false);
    setIsRatingVisible(false);
    if (prevCounter === 5) {
      setCounter(5);
    } else {
      setCounter(prevCounter - 0.5);
      setPrevCounter((prev) => (prev -= 0.5));
    }
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
              isAnswerVisible={isAnswerVisible}
              question={question}
            />
          );
        })}
      {isRatingVisible ? (
        <Grading
          onRateOrSkipClicking={onRateOrSkipClicking}
          question={question}
          setSkipOrRate={setSkipOrRate}
        />
      ) : null}
    </div>
  );
}
