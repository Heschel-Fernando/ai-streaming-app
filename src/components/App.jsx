import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import { Actors, MovieDetails, NavBar, Profile, Movies } from "./index";

const App = () => {
  return (
    <div>
      <CssBaseline />
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/movie/:id">
            <h2>
              <MovieDetails />
            </h2>
          </Route>
          <Route exact path="/actors/:id">
            <h2>
              <Actors />
            </h2>
          </Route>
          <Route exact path="/">
            <h2>
              <Movies />
            </h2>
          </Route>
          <Route exact path="/profile/:id">
            <h2>
              <Profile />
            </h2>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
