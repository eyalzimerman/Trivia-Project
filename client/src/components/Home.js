import React from "react";
import Button from "@material-ui/core/Button";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
const StyledButton = withStyles({
  root: {
    backgroundColor: "#248b77",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 6px 5px 2px rgba(112, 99, 102, 0.568)",
    fontSize: "1.2em",
    width: "11em",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

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
      <h1 id="main-title">Hello, {userName}</h1>
      <div id="login-container">
        <Link to="/game">
          <StyledButton className="start-game-button" variant="contained">
            Start Game
          </StyledButton>
        </Link>
        <Link to="/scoreboard">
          <StyledButton className="scoreboard-button" variant="contained">
            Scoreboard
          </StyledButton>
        </Link>

        <StyledButton
          onClick={logoutHandler}
          className="scoreboard-button"
          variant="contained"
        >
          Logout <ExitToAppIcon className="logout-icon" />
        </StyledButton>
      </div>
    </div>
  );
}
