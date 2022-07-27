import { Grid } from "@mui/material";
import React from "react";
import Movie from "../Movie";
import useStyles from "./styles";

const MovieList = ({ movies, numberOfMovies }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.moviesContainer}>
        {movies &&
          movies.results.slice(0, numberOfMovies).map((movie, index) => <Movie key={index} movie={movie} i={index} />)}
      </Grid>
    </div>
  );
};

export default MovieList;
