import React from "react";

export default function UserRow({ user }) {
  return (
    <div>
      {user.name} {user.score}
    </div>
  );
}
