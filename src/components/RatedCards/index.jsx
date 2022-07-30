import { Box, Typography } from "@mui/material";
import React from "react";
import Movie from "../Movie";
import useStyles from "./styles";

const RatedCards = ({ title, data }) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography style={{ marginTop: "3rem" }} variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results.map((movie, index) => (
          <Movie key={index} movie={movie} i={index} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
