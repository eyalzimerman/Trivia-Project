import React from "react";

export default function UserRow({ user, index }) {
  return (
    <div className="user-row">
      <span className="scoreboard-index">{index + 1}.</span>
      <span className="scoreboard-username">{user.name}</span>
      <span className="scoreboard-score">{user.score}</span>
    </div>
  );
}
