import React, { Fragment, useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
const Navbar = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    history.push("/logout");
  };

  return (
    <div className="navbar">
      <AppBar variant="outlined" color="primary" position="sticky">
        <Container>
          <Toolbar variant="dense">
            <Typography className="navbar__title" variant="h6" align="center">
              <Link to="/">Blog</Link>
            </Typography>
            <div className="navbar__links">
              <Typography align="center" className="navbar__link">
                {user ? (
                  <Fragment>
                    <Avatar
                      component="span"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      variant="menu"
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link to="/dashboard">Profile</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/post/new">write a post</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/post">post</Link>
                      </MenuItem>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                  </Fragment>
                ) : (
                  <Link to="/login">login</Link>
                )}
              </Typography>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
