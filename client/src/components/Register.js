import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

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
    } catch (error) {
      console.log("Error signing up");
    }
  };

  return (
    <div id="register-container">
      <h1 id="register-title">Welcome to the best Trivia ever</h1>
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
      <Button
        onClick={registerClick}
        id="register-button"
        variant="contained"
        color="primary"
      >
        Register
      </Button>
    </div>
  );
}
