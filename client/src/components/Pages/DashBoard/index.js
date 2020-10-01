import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { PostCards } from "../Home/";
import "./DashBoard.css";

import { Avatar, Button, Container, Typography } from "@material-ui/core";
const DashBoard = () => {
  const { id } = useContext(UserContext).user;
  const { dispatch } = useContext(UserContext);

  const [user, setUser] = useState({});
  const onClick = async () => {
    try {
      await fetch("/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "LOGOUT" });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/user/${id}`);
      const jres = await res.json();
      setUser(jres);
    };
    fetchData();
  }, []);
  const { date, name, posts } = user;
  return (
    <Container className="dashboard" maxWidth="md">
      <div className="dashboard__title">
        <div className="dashboard__titleLeft">
          <Typography variant="h3">{name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {date}
          </Typography>
        </div>
        <div className="dashboard__titleRight">
          <Avatar />
          <div className="dashboard__titleRightBtn">
            <Button
              onClick={onClick}
              variant="contained"
              color="secondary"
              size="small"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="dashBoard__cards">
        {posts ? <PostCards posts={posts} dashboard /> : null}
      </div>
    </Container>
  );
};

export default DashBoard;
