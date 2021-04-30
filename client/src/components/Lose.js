import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Lose({ gameScore }) {
  return (
    <div className="lose-container">
      <div id="game-score">{gameScore} - Points</div>
      {gameScore < 150 ? (
        <div id="end-game-user">Try harder...</div>
      ) : gameScore < 300 ? (
        <div id="end-game-user">Nice! You are better then this...</div>
      ) : (
        <div id="end-game-user">Very good job!!</div>
      )}
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
  );
}
