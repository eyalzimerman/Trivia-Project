import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Home({ inputHandler, userName }) {
  const inputRef = useRef();
  return (
    <div id="home-container">
      <h1 id="main-title">Trivia Game</h1>
      <div id="login-container">
        <input
          id="username-input"
          ref={inputRef}
          type="text"
          placeholder="Enter user name"
          onChange={(e) => inputHandler(e.target.value)}
          required
        />
        {userName === "" ? (
          <Link to="/">
            <Button
              className="start-game-button"
              onClick={() => inputRef.current.focus()}
              variant="contained"
            >
              Start Game
            </Button>
          </Link>
        ) : (
          <Link to="/game">
            <Button className="start-game-button" variant="contained">
              Start Game
            </Button>
          </Link>
        )}
        <Link to="/scoreboard">
          <Button
            className="scoreboard-button"
            variant="contained"
            color="primary"
          >
            Scoreboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
