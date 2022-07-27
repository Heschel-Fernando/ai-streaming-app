import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    /* Get Movies by [Type] */
    getGenre: builder.query({
      query: () => {
        return `genre/movie/list?api_key=${tmdbApiKey}`;
      },
    }),

    /* Get Movies by [Genre] */
    getMovies: builder.query({
      query: ({ genreOrCategoryName, page, searchQuery }) => {
        /* For movies by Search */
        if (searchQuery) return `search/movie?api_key=${tmdbApiKey}&language=en-US&query=${searchQuery}&page=${page}`;

        /* For movies by Category */
        if (genreOrCategoryName && typeof genreOrCategoryName === "string") {
          /* return `movie/${genreOrCategoryName}?api_key=${tmdbApiKey}&language=en-US&page=${page}`; */
          console.log("new", genreOrCategoryName);
          return `movie/${genreOrCategoryName}?api_key=${tmdbApiKey}&language=en-US&page=${page}`;
        }

        /* For movies by Genre */
        if (genreOrCategoryName && typeof genreOrCategoryName === "number") {
          return `discover/movie?api_key=${tmdbApiKey}&language=en-US&page=${page}&with_genres=${genreOrCategoryName}`;
        }

        /* For popular movies */
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenreQuery, useGetMovieDetailsQuery } = tmdbApi;
