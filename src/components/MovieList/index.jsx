import { Grid } from "@mui/material";
import React from "react";
import Movie from "../Movie";
import useStyles from "./styles";

const MovieList = ({ movies, numberOfMovies, type }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.moviesContainer}>
        {movies &&
          type === "actor" &&
          movies.cast.slice(0, numberOfMovies).map((movie, index) => <Movie key={index} movie={movie} i={index} />)}
        {movies &&
          type === "non_actor" &&
          movies.results.slice(0, numberOfMovies).map((movie, index) => <Movie key={index} movie={movie} i={index} />)}
      </Grid>
    </div>
  );
};

export default MovieList;

{
  /* <div>
      <Grid container className={classes.moviesContainer}>
        {movies &&
          movies.results.slice(0, numberOfMovies).map((movie, index) => <Movie key={index} movie={movie} i={index} />)}
      </Grid>
    </div> */
}
