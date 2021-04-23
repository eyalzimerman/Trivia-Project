import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import decypter from "../Utils/decypter";
import axios from "axios";
import Answer from "./Answer";
import Question from "./Question";
import Grading from "./Grading";
import Lose from "./Lose";

export default function Game({ userName }) {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState({});
  const [counter, setCounter] = useState(20);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [skipOrRate, setSkipOrRate] = useState(0);
  const [prevCounter, setPrevCounter] = useState(20);
  const [lives, setLives] = useState(3);
  const [disableButtons, setDisableButtons] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const [currentQuestionIdArray, setCurrentQuestionIdArray] = useState([]);
  const [allSavedQuestionsId, setAllSavedQuestionsId] = useState([]);
  const [answerTimeClicked, setAnswerTimeClicked] = useState();

  useEffect(() => {
    if (counter === 0) {
      setIsAnswerVisible(true);
      setIsRatingVisible(true);
      setDisableButtons(true);
      setLives((prev) => prev - 1);
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
      setQuestion(res.data);

      const allSaved = await axios.get("/api/trivia/all-saved-questions");
      const allId = allSaved.data.map((question) => {
        return question.id;
      });
      setAllSavedQuestionsId(allId);
    })();
  }, []);

  const answerClickEvent = (value) => {
    const answer = decypter(question.answer);
    if (answer === value) {
      setDisableButtons(true);
      setAnswerTimeClicked(counter);
      const timeItTookToAnswer = prevCounter - counter;
      const score = Math.floor(
        (1 - timeItTookToAnswer / prevCounter) * 70 + 30
      );
      setGameScore((prev) => (prev += score));
    } else {
      setDisableButtons(true);
      setLives((prev) => prev - 1);
    }
    setCounter("");
    setIsAnswerVisible(true);
    setIsRatingVisible(true);
  };

  useEffect(() => {
    setQuestionNumber((prev) => (prev += 1));

    (async () => {
      if (allSavedQuestionsId.length === currentQuestionIdArray.length) {
        const num = Math.floor(Math.random() * 3) + 1;
        const res = await axios.get(`/api/trivia/type${num}`);
        setQuestion(res.data);
        setDisableButtons(false);
      } else {
        if (questionNumber % 3 === 0) {
          let res = await axios.get(`/api/trivia/saved-question`);

          while (currentQuestionIdArray.includes(res.data.id)) {
            res = await axios.get(`/api/trivia/saved-question`);
            if (!currentQuestionIdArray.includes(res.data.id)) {
              break;
            }
          }
          const questionId = res.data.id;
          const temp = [...currentQuestionIdArray];
          temp.push(questionId);
          setCurrentQuestionIdArray(temp);
          setQuestion(res.data);
          setDisableButtons(false);
        } else {
          const num = Math.floor(Math.random() * 3) + 1;
          const res = await axios.get(`/api/trivia/type${num}`);
          setQuestion(res.data);
          setDisableButtons(false);
        }
      }
    })();
  }, [skipOrRate]);

  useEffect(() => {
    (async () => {
      if (lives === 0) {
        const user = {
          name: userName,
          score: gameScore,
        };
        try {
          await axios.post("/api/trivia/user", user);
        } catch (error) {
          console.log("User failed");
        }
      }
    })();
  }, [lives]);

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
      <div>{userName}</div>
      <div>{counter}</div>
      <div>{lives}</div>
      <Link to="/">
        <Button variant="contained" color="primary">
          Home
        </Button>
      </Link>
      {lives === 0 ? (
        <div>
          <div>{gameScore}</div>
          <Lose />
          <Link to="/scoreboard">
            <Button variant="contained" color="primary">
              Scoreboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="contained">New Game</Button>
          </Link>
        </div>
      ) : (
        <div>
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
                  disableButtons={disableButtons}
                />
              );
            })}
          {isRatingVisible ? (
            <Grading
              onRateOrSkipClicking={onRateOrSkipClicking}
              question={question}
              setSkipOrRate={setSkipOrRate}
              questionNumber={questionNumber}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
