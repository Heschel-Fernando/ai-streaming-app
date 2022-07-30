import React from "react";
import { CssBaseline } from "@mui/material";
import useStyles from "../styles";

import { Route, Switch } from "react-router-dom";
import { Actors, MovieDetails, NavBar, Profile, Movies } from "./index";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolBar} />
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
          <Route exact path={["/", "/approved"]}>
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
