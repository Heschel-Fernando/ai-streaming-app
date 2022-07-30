import { ExitToApp } from "@mui/icons-material";
import { Typography, Button, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useGetUserListQuery } from "../../services/tmdb";

import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import RatedCards from "../RatedCards";

const Profile = () => {
  const { user } = useSelector(userSelector);
  console.log("account", user);

  const logoutHandler = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetUserListQuery({
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    type: "favorite",
    page: 1,
  });

  const { data: watchlistedMovies, refetch: refetchWatchlist } = useGetUserListQuery({
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    type: "watchlist",
    page: 1,
  });

  console.log("favorites", favoriteMovies);
  console.log("watchlisted", watchlistedMovies);

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

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

      {!favoriteMovies?.results.length && !watchlistedMovies?.results.length ? (
        <Typography variant="h5">Add movies to your watchlist or mark them as favorites, to see them here!</Typography>
      ) : (
        <Box>
          <RatedCards title="My Favorites" data={favoriteMovies} />
          <RatedCards title="My watchlist" data={watchlistedMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
