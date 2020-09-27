import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";

import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

import { Link } from "react-router-dom";
import "./Posts.css";
import { UserContext } from "../../../context/userContext";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await (await fetch("/post")).json();
        setPosts(res);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);
  return (
    <Container className="posts" maxWidth="md">
      {posts.map((post) => {
        return (
          <Card className="posts__card" variant="elevation">
            <CardContent className="posts__cardContent">
              <Typography variant="h3" gutterBottom>
                <Link className="posts__title" to={"/post/" + post._id}>
                  {post.title}
                </Link>
              </Typography>
              <Typography align="justify" variant="body2" color="textSecondary">
                {post.body}
              </Typography>
              <CardActions className="posts__cardAction">
                <IconButton>
                  <ShareOutlinedIcon />
                </IconButton>
                <IconButton>
                  <BookmarkBorderOutlinedIcon />
                </IconButton>
                <Button
                  disableElevation
                  variant="contained"
                  endIcon={<ArrowForwardIosOutlinedIcon />}
                  size="medium"
                  href={"/post/" + post._id}
                >
                  Read more
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};

export default Home;
