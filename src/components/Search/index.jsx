import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, InputAdornment, Input } from "@mui/material";
import { useLocation } from "react-router-dom";

import { Search as SearchIcon } from "@mui/icons-material";
import { searchMovie } from "../../features/currentGenreOrCategory";
import useStyles from "./styles";

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      dispatch(searchMovie(query));
      setQuery("");
    }
  };

  if (location.pathname !== "/") return null;

  return (
    <div className={classes.searchContainer}>
      <TextField
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={handleKeyPress}
        variant="outlined"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      >
        Search
      </TextField>
    </div>
  );
};

export default Search;
