import React from "react";
import Home from "./Home";
import Scoreboard from "./Scoreboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./Game";
import NotFound from "./NotFound";

export default function Main() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/scoreboard" component={Scoreboard} />
          <Route exact path="/game" component={Game} />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
