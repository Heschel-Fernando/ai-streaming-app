import React from "react";
import { Box, Typography, CardContent, CardMedia, Card } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const FeaturedMovie = ({ movie }) => {
  console.log("featured", movie);
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box component={Link} to={`movie/${movie.id}`} className={classes.featuredCardContainer}>
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          title={movie.title}
          className={classes.cardMedia}
        />
        <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography gutterBottom variant="h5">
              {movie?.title}
            </Typography>
            <Typography variant="body2">{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
