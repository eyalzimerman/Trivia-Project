import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Home({ inputHandler, userName }) {
  const inputRef = useRef();
  return (
    <div>
      <h1>Trivia Game</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter user name"
        onChange={(e) => inputHandler(e.target.value)}
        required
      />
      {userName === "" ? (
        <Link to="/">
          <Button onClick={() => inputRef.current.focus()} variant="contained">
            Start Game
          </Button>
        </Link>
      ) : (
        <Link to="/game">
          <Button variant="contained">Start Game</Button>
        </Link>
      )}
      <Link to="/scoreboard">
        <Button variant="contained" color="primary">
          Scoreboard
        </Button>
      </Link>
    </div>
  );
}
