import { ClassNames } from "@emotion/react";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGetActorDetailsQuery, useGetMovieOfActorQuery } from "../../services/tmdb";
import MovieList from "../MovieList";

import useStyles from "./styles";

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: actorMovies, isFetching: fetchingActorMovies } = useGetMovieOfActorQuery(id);
  const [page, setPage] = useState(1);

  const classes = useStyles();

  console.log("actor", data);

  console.log("moviesOfActor", actorMovies);

  if (isFetching || fetchingActorMovies) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data || !actorMovies) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">Oops, we couldn't find any movies with that name</Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt="actor_image"
            className={classes.image}
          />
        </Grid>

        <Grid item lg={7} xl={8} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Birthday: {new Date(data?.birthday).toLocaleString("default", { month: "short" })}{" "}
            {+new Date(data?.birthday).toLocaleString("default", { day: "2-digit" }) + 1}{" "}
            {new Date(data?.birthday).toLocaleString("default", { year: "numeric" })}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {data?.biography || (
              <Typography style={{ marginTop: "2rem" }} variant="body1">
                No biography added yet
              </Typography>
            )}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
              color="primary"
            >
              IMDB
            </Button>

            <Button
              startIcon={<ArrowBack />}
              onClick={() => {
                history.goBack();
              }}
            >
              Go back
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box margin="2rem 0">
        <Typography style={{ marginBottom: "3rem" }} gutterBottom variant="h2" align="center">
          Movies
        </Typography>
        {actorMovies && <MovieList type={"actor"} movies={actorMovies} numberOfMovies={12} />}
      </Box>
    </React.Fragment>
  );
};

export default Actors;
