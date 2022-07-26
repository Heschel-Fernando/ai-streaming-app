import React, { useEffect, useState } from "react";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import redLogo from "../../assets/images/red_logo.png";
import blueLogo from "../../assets/images/blue_logo.png";

import useStyles from "./styles";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useGetGenreQuery } from "../../services/tmdb";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

/* const blueLogo = "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const redLogo = "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png"; */

const categories = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top_rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching, error } = useGetGenreQuery();
  const dispatch = useDispatch();

  const { genreOrCategoryName } = useSelector((state) => {
    return state.currentGenreOrCategory;
  });

  console.log(genreOrCategoryName);

  return (
    <React.Fragment>
      <Link to="/" className={classes.imageLink}>
        <img className={classes.image} src={theme.palette.mode === "light" ? blueLogo : redLogo} alt="Logo" />
      </Link>

      <Divider />

      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt="genre icons"
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center" style={{ marginTop: "50%" }}>
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    alt="genre icons"
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </React.Fragment>
  );
};

export default Sidebar;
