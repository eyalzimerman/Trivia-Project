import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login({
  userInputHandler,
  passwordInputHandler,
  userName,
  password,
  setUserExists,
}) {
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
      console.log("success logging in");
    } catch (error) {
      console.log("error invalid user");
    }
  };

  return (
    <div id="login-container-div">
      <h1 id="login-title">Welcome to the best Trivia ever </h1>
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

      <Button
        onClick={onClickHandler}
        className="login-button"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      <div>
        <span>Don't have a user yet? Register now </span>
      </div>
      <Link to="/register">
        <Button
          className="login-register-button"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </Link>
    </div>
  );
}
