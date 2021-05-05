import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
const StyledButton = withStyles({
  root: {
    backgroundColor: "#248b77",
    borderRadius: 3,
    border: 0,
    color: "white",
    boxShadow: "0 6px 5px 2px rgba(112, 99, 102, 0.568)",
    fontSize: "1em",
    height: "2em",
    minWidth: "20%",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export default function Register({
  userInputHandler,
  passwordInputHandler,
  userName,
  password,
  setNewUser,
  setPassword,
  setUserName,
  setUserExists,
}) {
  const [newRegister, setNewRegister] = useState(false);

  useEffect(() => {
    setPassword("");
    setUserName("");
  }, []);
  const registerClick = async () => {
    const user = {
      name: userName,
      password: password,
    };
    if (userName === "" || password === "") {
      return;
    }
    try {
      await axios.post("/api/users/register", user);
      setNewUser(true);
      setUserExists(true);
      setNewRegister(false);
    } catch (error) {
      console.log("Error signing up");
      setNewRegister(true);
    }
  };

  return (
    <div id="register-container">
      <h1 id="register-title">Countries Trivia</h1>
      <h2>Register Now!</h2>
      <input
        id="username-input-register"
        type="text"
        placeholder="Enter user name"
        onChange={(e) => userInputHandler(e.target.value)}
        required
      />
      <input
        id="password-input-register"
        type="password"
        placeholder="Enter password"
        onChange={(e) => passwordInputHandler(e.target.value)}
        required
      />
      <StyledButton
        onClick={registerClick}
        id="register-button"
        variant="contained"
      >
        Register
      </StyledButton>
      {newRegister ? (
        <div className="message-incorrect">
          Username already exist{" "}
          <SentimentVeryDissatisfiedIcon className="sad-icon" />
        </div>
      ) : null}
    </div>
  );
}
