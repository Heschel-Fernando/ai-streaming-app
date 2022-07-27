import { ExitToApp } from "@mui/icons-material";
import { Typography, Button, Box } from "@mui/material";
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";

const Profile = () => {
  const { user } = useSelector(userSelector);
  console.log("account", user);

  const logoutHandler = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  const favMovies = [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logoutHandler}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>

      {!favMovies.length ? (
        <Typography variant="h5">Add movies to your watchlist or mark them as favorites, to see them here!</Typography>
      ) : (
        <Box>My Fav Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
