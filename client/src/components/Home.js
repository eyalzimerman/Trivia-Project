import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Home({ setUserExists }) {
  const logoutHandler = async () => {
    try {
      await axios.post("/api/users/logout");
      setUserExists(false);
    } catch (error) {
      console.log("error logout");
    }
  };
  return (
    <div id="home-container">
      <h1 id="main-title">Trivia Game</h1>
      <div id="login-container">
        <Link to="/game">
          <Button className="start-game-button" variant="contained">
            Start Game
          </Button>
        </Link>
        <Link to="/scoreboard">
          <Button
            className="scoreboard-button"
            variant="contained"
            color="primary"
          >
            Scoreboard
          </Button>
        </Link>

        <Button
          onClick={logoutHandler}
          className="scoreboard-button"
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
