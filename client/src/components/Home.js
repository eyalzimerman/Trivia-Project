import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ inputHandler }) {
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
