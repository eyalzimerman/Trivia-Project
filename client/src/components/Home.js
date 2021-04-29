import React from "react";
import Button from "@material-ui/core/Button";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home({ setUserExists, setNewUser, userName }) {
  const logoutHandler = async () => {
    try {
      await axios.post("/api/users/logout");
      setNewUser(false);
      setUserExists(false);
    } catch (error) {
      console.log("error logout");
    }
  };
  return (
    <div id="home-container">
      <div className="user-icon">
        <AccountCircleRoundedIcon className="icon" /> {userName}
      </div>
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
          Logout <ExitToAppIcon className="logout-icon" />
        </Button>
      </div>
    </div>
  );
}
