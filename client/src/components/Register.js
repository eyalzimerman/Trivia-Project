import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register({
  userInputHandler,
  passwordInputHandler,
  userName,
  password,
  setNewUser,
}) {
  const registerClick = async () => {
    const user = {
      name: userName,
      password: password,
    };
    try {
      await axios.post("/api/user/register", user);
      setNewUser(true);
    } catch (error) {
      console.log("Error signing up");
    }
  };
  return (
    <div>
      <h1>Welcome to the best Trivia ever </h1>
      <h2>Register Now!</h2>
      <input
        className="username-input"
        type="text"
        placeholder="Enter user name"
        onChange={(e) => userInputHandler(e.target.value)}
        required
      />
      <input
        className="password-input"
        type="password"
        placeholder="Enter password"
        onChange={(e) => passwordInputHandler(e.target.value)}
        required
      />
      <Button
        onClick={registerClick}
        className="scoreboard-button"
        variant="contained"
        color="primary"
      >
        Register
      </Button>
    </div>
  );
}
