import { configureStore } from "@reduxjs/toolkit";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";

import { tmdbApi } from "../services/tmdb";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },
});
