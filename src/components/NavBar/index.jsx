import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Sidebar from "../Sidebar";
import Search from "../Search";
import fetchTokens, { createSessionId, moviesApi } from "../../utils";

import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, useTheme } from "@mui/material";
import { Menu, AccountCircle, Brightness4, Brightness7, Brightness1 } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth";
import { ColorModeCxt } from "../../utils/ToggleDarkMode";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(userSelector);

  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width:600px)`);
  const theme = useTheme();
  const dispatch = useDispatch();
  const colorMode = useContext(ColorModeCxt);

  const token = localStorage.getItem("request_token");
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (session_id) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${session_id}`);

          dispatch(setUser(userData));
          console.log("user", userData);
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(userData));
          console.log("user", userData);
        }
      }
    };

    loginUser();
  }, [token]);

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevState) => !prevState)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.ToggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchTokens}>
                Log in &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <> My Profile &nbsp; </>}
                <Avatar
                  style={{ height: "30px", width: "30px" }}
                  alt="profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              variant="temporary"
              anchor="right"
              className={classes.drawerBg}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen}></Sidebar>
            </Drawer>
          )}
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
