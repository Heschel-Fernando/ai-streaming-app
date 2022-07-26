import React, { useState, useEffect } from "react";
import { Box, CircularProgress, useMediaQuery, Typography, Pagination } from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/tmdb.js";
import MovieList from "../MovieList/index.jsx";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory.js";

import PaginationComp from "../Pagination/index.jsx";
import FeaturedMovie from "../Featured/index.jsx";

const Movies = () => {
  const [page, setpage] = useState(1);

  const { genreOrCategoryName, searchQuery } = useSelector((state) => {
    return state.currentGenreOrCategory;
  });
  const { data, error, isFetching } = useGetMoviesQuery({ genreOrCategoryName, page, searchQuery });

  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));

  const numberOfMovies = lg ? 16 : 18;

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
        <FeaturedMovie movie={data?.results[1]} />
        <MovieList type="non_actor" movies={data} numberOfMovies={numberOfMovies} />
        <PaginationComp currentPage={page} setPage={setpage} totalPages={data?.total_pages} />
      </div>
    </div>
  );
};

export default Movies;
