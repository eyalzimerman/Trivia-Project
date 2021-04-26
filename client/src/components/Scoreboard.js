import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState([]);

  // Get the scoreboard from database
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/trivia/scoreboard");
        setScoreboard(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div id="scoreboard-container">
      <h1 id="scoreboard-title">Scoreboard</h1>
      {scoreboard.map((user, i) => {
        return <UserRow index={i} key={`UserRow-${i}`} user={user} />;
      })}
      <div id="div-scoreboard-button">
        <Link to="/">
          <Button
            id="scoreboard-home-button"
            variant="contained"
            color="primary"
          >
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
