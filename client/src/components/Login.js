import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
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
    minWidth: "35%",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export default function Login({
  userInputHandler,
  passwordInputHandler,
  userName,
  password,
  setUserExists,
}) {
  const [isUserExists, setIsUserExists] = useState(false);
  const onClickHandler = async () => {
    const user = {
      name: userName,
      password: password,
    };
    if (userName === "" || password === "") {
      return;
    }
    try {
      await axios.post("/api/users/login", user);
      setUserExists(true);
      setIsUserExists(false);
      console.log("success logging in");
    } catch (error) {
      console.log("error invalid user");
      setIsUserExists(true);
    }
  };

  return (
    <div id="login-container-div">
      <h1 id="login-title">Countries Trivia</h1>
      <h2>Login into your account</h2>
      <input
        className="username-input-login"
        type="text"
        placeholder="Enter user name"
        onChange={(e) => userInputHandler(e.target.value)}
        required
      />
      <input
        className="password-input-login"
        type="password"
        placeholder="Enter password"
        onChange={(e) => passwordInputHandler(e.target.value)}
        required
      />
      <div>Don't have a user yet? Register now</div>
      <div className="buttons-container">
        <StyledButton
          onClick={onClickHandler}
          className="login-button"
          variant="contained"
        >
          Login
        </StyledButton>
        <Link to="/register">
          <StyledButton className="login-register-button" variant="contained">
            Register
          </StyledButton>
        </Link>
      </div>
      {isUserExists ? (
        <div className="message-incorrect">
          Username or Password are incorrect !
        </div>
      ) : null}
    </div>
  );
}
