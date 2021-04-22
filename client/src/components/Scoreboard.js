import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import axios from "axios";

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState([]);
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
    <div>
      {scoreboard.map((user, i) => {
        return <UserRow key={`UserRow-${i}`} user={user} />;
      })}
    </div>
  );
}
