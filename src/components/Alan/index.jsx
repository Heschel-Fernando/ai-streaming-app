import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import fetchTokens from "../../utils";
import { userSelector } from "../../features/auth";
import { ColorModeCxt } from "../../utils/ToggleDarkMode";
import { selectGenreOrCategory, searchMovie } from "../../features/currentGenreOrCategory";

import alanBtn from "@alan-ai/alan-sdk-web";

const useAlanAi = () => {
  const { setMode } = useContext(ColorModeCxt);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_AI_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "profile") {
          history.push(`/profile/${user.id}`);
        }

        if (command === "home") {
          history.push("/");
        }

        if (command === "changeMode") {
          setMode(mode);
        }

        if (command === "login") {
          fetchTokens();
        }

        if (command === "logout") {
          localStorage.clear();

          history.push("/");
        }

        if (command === "chooseGenre") {
          const foundGenre = genres?.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

          if (foundGenre) {
            history.push("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top") ? "top_rated" : genreOrCategory;
            history.push("/");
            dispatch(selectGenreOrCategory(category));
          }
        }

        if (command === "search") {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlanAi;
