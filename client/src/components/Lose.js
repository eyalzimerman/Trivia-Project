import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Lose({ gameScore, userName }) {
  return (
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
  );
}
