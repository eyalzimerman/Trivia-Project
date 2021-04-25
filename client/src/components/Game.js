import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import decypter from "../Utils/decypter";
import axios from "axios";
import Answer from "./Answer";
import Question from "./Question";
import Grading from "./Grading";
import LifeSaver from "./LifeSaver";
import LinearDeterminate from "./LinearDeterminate";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [lifeSaver, setLifeSaver] = useState(2);

  const [currentQuestionIdArray, setCurrentQuestionIdArray] = useState([]);
  const [allSavedQuestionsId, setAllSavedQuestionsId] = useState([]);

  const [ratedNewQuestions, setRatedNewQuestions] = useState([]);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (counter === 0) {
      setIsAnswerVisible(true);
      setIsRatingVisible(true);
      setDisableButtons(true);
      setDisableSaveButton(true);
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
      const timeItTookToAnswer = prevCounter - counter;
      const score = Math.floor(
        (1 - timeItTookToAnswer / prevCounter) * 70 + 30
      );

      if (question.saved === true) {
        setGameScore((prev) => (prev += 30));
      } else {
        setGameScore((prev) => (prev += score));
      }
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
          for (const question of ratedNewQuestions) {
            await axios.post("/api/trivia/new", question);
          }
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
    setDisableSaveButton(false);
    setProgress(100);
    if (prevCounter === 5) {
      setCounter(5);
    } else {
      setCounter(prevCounter - 0.5);
      setPrevCounter((prev) => (prev -= 0.5));
    }
  };

  return (
    <div>
      {lives === 0 ? (
        <div>
          <div id="end-game-user">{userName}</div>
          <div id="game-score">{gameScore} - Points</div>
          <div id="end-game-button-container">
            <Link to="/scoreboard">
              <Button
                id="game-scoreboard-button"
                variant="contained"
                color="primary"
              >
                Scoreboard
              </Button>
            </Link>
            <Link to="/">
              <Button id="new-game-button" variant="contained">
                New Game
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div id="lives">
            {lives === 3 ? (
              <div>
                {" "}
                <FavoriteIcon /> <FavoriteIcon /> <FavoriteIcon />
              </div>
            ) : lives === 2 ? (
              <div>
                {" "}
                <FavoriteIcon /> <FavoriteIcon />
              </div>
            ) : lives === 1 ? (
              <div>
                <FavoriteIcon />
              </div>
            ) : null}
          </div>
          <Question question={question} />
          <div id="timer">{Math.round(counter)}</div>
          <LinearDeterminate
            counter={counter}
            prevCounter={prevCounter}
            progress={progress}
            setProgress={setProgress}
          />
          <LifeSaver
            question={question}
            setLifeSaver={setLifeSaver}
            lifeSaver={lifeSaver}
            setQuestion={setQuestion}
            setCounter={setCounter}
            disableSaveButton={disableSaveButton}
            setProgress={setProgress}
            prevCounter={prevCounter}
            counter={counter}
          />
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
              setRatedNewQuestions={setRatedNewQuestions}
              ratedNewQuestions={ratedNewQuestions}
            />
          ) : null}
        </div>
      )}
      <div id="game-home-button-div">
        <Link to="/">
          <Button variant="contained" color="primary">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
