import React from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, IconButton } from "@material-ui/core";
import store from "store";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import history from "../history";

const handleLogOut = () => {
  store.remove("isLoggedIn");
  store.remove("user");
  history.replace("/login");
};

const AppBar = () => {
  return (
    <MuiAppBar position="static">
      <Toolbar variant="dense">
        <LocalLibraryIcon style={{ marginRight: 5 }} />
        <Typography variant="h6" color="inherit">
          SCHOOL
        </Typography>
        <IconButton
          edge="start"
          style={{ marginLeft: "auto" }}
          aria-label="logout user"
          onClick={handleLogOut}
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
