import React, { useState, useEffect } from "react";
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/tmdb.js";
import MovieList from "../MovieList/index.jsx";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory.js";

const Movies = () => {
  const [page, setPage] = useState(1);

  const { genreOrCategoryName } = useSelector((state) => {
    return state.currentGenreOrCategory;
  });
  const { data, error, isFetching } = useGetMoviesQuery({ genreOrCategoryName, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">Oops, we couldn't find any movies with that name</Typography>
      </Box>
    );
  }

  if (error) return "An error has occured";

  return (
    <div>
      <div>
        <MovieList movies={data} />
      </div>
    </div>
  );
};

export default Movies;
