import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <AppBar variant="outlined" color="primary" position="sticky">
        <Container>
          <Toolbar variant="dense">
            <Typography className="navbar__title" variant="h6" align="center">
              Blog
            </Typography>
            <div className="navbar__links">
              <Typography align="center" className="navbar__link">
                <Link to="/login">login</Link>
              </Typography>
              <Typography align="center" className="navbar__link">
                <Link to="/post/new">write a post</Link>
              </Typography>
              <Typography align="center" className="navbar__link">
                <Link to="/post">post</Link>
              </Typography>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
