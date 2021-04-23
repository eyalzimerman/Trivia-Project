import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import decypter from "../Utils/decypter";

export default function Home() {
  const [userName, setUserName] = useState("");
  const inputHandler = (value) => {
    setUserName(value);
  };
  return (
    <div>
      <h1>Trivia Game</h1>
      <input
        type="text"
        placeholder="Enter user name"
        onChange={(e) => inputHandler(e.target.value)}
      />
      <Link to="/game">
        <Button variant="contained">Start Game</Button>
      </Link>
      <Link to="/scoreboard">
        <Button variant="contained" color="primary">
          Scoreboard
        </Button>
      </Link>
    </div>
  );
}
