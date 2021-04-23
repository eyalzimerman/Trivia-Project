import React, { useState } from "react";
import Home from "./Home";
import Scoreboard from "./Scoreboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./Game";
import NotFound from "./NotFound";

export default function Main() {
  const [userName, setUserName] = useState("");
  const inputHandler = (value) => {
    setUserName(value);
  };
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home inputHandler={inputHandler} />
          </Route>
          <Route exact path="/scoreboard">
            <Scoreboard />
          </Route>
          <Route exact path="/game">
            <Game userName={userName} />
          </Route>
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
