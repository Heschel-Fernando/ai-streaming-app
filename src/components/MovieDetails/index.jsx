import React, { useState, useEffect } from "react";
import { useGetMovieDetailsQuery, useGetRecommendationsQuery } from "../../services/tmdb";
import useStyles from "./styles";
import genreIcons from "../../assets/genres";

import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  FavoriteBorder,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import MovieList from "../MovieList";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieDetailsQuery(id);

  const [open, setOpen] = useState(false);

  const isFavorited = false;
  const isWatchListed = false;

  const { data: recommendationData, isFetching: recommendationFetching } = useGetRecommendationsQuery({
    list: "/recommendations",
    movie_id: id,
  });
  console.log("recommendationData", recommendationData);

  const addToFavorites = () => {};

  const addToWatchlist = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem"></CircularProgress>
      </Box>
    );
  }

  console.log("details", data);

  if (error) {
    return (
      <Box justifyContent="center">
        <Box marginBottom="20px" display="flex">
          <Typography variant="h3">Hmmm, we were unable to fetch details for this movie</Typography>
        </Box>
        <Link to="/">Please try another one</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        {data?.poster_path ? (
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt="Movie Poster Image"
            onClick={() => setOpen(true)}
          />
        ) : (
          <img className={classes.poster} src="https://www.fillmurray.com/200/300" alt="Movie Poster Image" />
        )}
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split("-")[0]})
        </Typography>
        <Typography style={{ marginBottom: "40px", marginTop: "30px" }} variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating precision="0.5" readOnly value={data?.vote_average / 2}></Rating>
            <Typography vriant="subtitle1" gutterBottom style={{ marginLeft: "10px" }}>
              {data?.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} {` min / ${data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ""}`}
          </Typography>
        </Grid>

        <Grid item className={classes.genresContainer}>
          {data?.genres.map((genre, index) => (
            <Link
              key={genre.name}
              onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
              className={classes.links}
              to="/"
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt="genre icons"
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginBottom: "30px", marginTop: "30px" }}>
          Overview
        </Typography>

        <Typography gutterBottom style={{ marginBottom: "40px" }}>
          {data?.overview}
        </Typography>

        <Typography variant="h5" gutterBottom>
          Cast
        </Typography>

        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (actor, i) =>
                  actor.profile_path && (
                    <Grid
                      style={{ textDecoration: "none" }}
                      item
                      md={2}
                      component={Link}
                      to={`/actors/${actor.id}`}
                      xs={4}
                      key={i}
                      spacing={2}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        alt={actor.name}
                      />
                      <Typography color="textPrimary">{actor?.name}</Typography>
                      <Typography color="textSecondary">{actor?.character.split("/")}</Typography>
                    </Grid>
                  )
              )
              .slice(0, 12)}
        </Grid>

        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>

                <Button
                  style={{ marginLeft: "10px" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>

                <Button
                  style={{ marginLeft: "10px" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  style={{ justifyContent: "center", paddingLeft: "3px", marginRight: "10px" }}
                  onClick={addToFavorites}
                  endIcon={isFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                >
                  {isFavorited ? "Unfavorite" : "Favorite"}
                </Button>

                <Button style={{ marginRight: "10px" }} onClick={addToWatchlist}>
                  {isFavorited ? "- Watchlist" : "+ Watchlist"}
                </Button>

                <Button sx={{ borderColor: "primary.main" }} endIcon={<ArrowBack />}>
                  <Typography
                    style={{ textDecoration: "none" }}
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    Go back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendationData ? (
          <MovieList movies={recommendationData} numberOfMovies={12} />
        ) : (
          <Box>Sorry, we couldn't find any recommendations for this one</Box>
        )}
      </Box>

      {data?.poster_path && (
        <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
          {data?.videos?.results?.length > 0 && (
            <iframe
              autoPlay
              className={classes.video}
              frameBorder="0"
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          )}
        </Modal>
      )}
    </Grid>
  );
};

export default MovieDetails;
