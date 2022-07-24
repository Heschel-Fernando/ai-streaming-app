import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Sidebar from "../Sidebar";

import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
  Brightness1,
} from "@mui/icons-material";

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width:600px)`);
  const theme = useTheme();
  const isAuthenticated = true;

  const [mobileOpen, setMobileOpen] = useState(false);

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

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && "Search..."}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Log in &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={"/profile/1234"}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <> My Movies &nbsp; </>}
                <Avatar
                  style={{ height: "30px", width: "30px" }}
                  alt="profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                />
              </Button>
            )}
          </div>
          {isMobile && "Search..."}
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
