import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    /* Get Movies by [genre] */
    getGenre: builder.query({
      query: () => {
        return `genre/movie/list?api_key=${tmdbApiKey}`;
      },
    }),
    /* Get Movies by [type] */
    getMovies: builder.query({
      query: ({ genreOrCategoryName, page, searchQuery }) => {
        console.log("tmdb", typeof genreOrCategoryName);
        /* For movies by Search */
        if (searchQuery)
          return `search/movie?api_key=${tmdbApiKey}&language=en-US&query=${searchQuery}&page=${page}`;

        /* For movies by Category */
        if (genreOrCategoryName && typeof genreOrCategoryName === "string") {
          return `movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=${page}`;
        }

        /* For movies by Genre */
        if (genreOrCategoryName && typeof genreOrCategoryName === "number") {
          return `discover/movie?api_key=${tmdbApiKey}&language=en-US&page=${page}&with_genres=${genreOrCategoryName}`;
        }

        /* For popular movies */
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenreQuery } = tmdbApi;
