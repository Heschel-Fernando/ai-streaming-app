import { Grid } from "@mui/material";
import React from "react";
import Movie from "../Movie";
import useStyles from "./styles";

const MovieList = ({ movies }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.moviesContainer}>
        {movies &&
          movies.results.map((movie, index) => (
            <Movie key={index} movie={movie} i={index} />
          ))}
      </Grid>
    </div>
  );
};

export default MovieList;
