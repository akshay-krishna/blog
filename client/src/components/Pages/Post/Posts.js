import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import ShareIcon from "@material-ui/icons/Share";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Link } from "react-router-dom";
import "./Posts.css";
const Posts = () => {
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
          <Card variant="elevation">
            <CardContent>
              <Typography variant="h3" gutterBottom>
                <Link className="posts__title" to={"/post/" + post._id}>
                  {post.title}
                </Link>
              </Typography>
              <Typography align="justify" variant="body2" color="textSecondary">
                {post.body}
              </Typography>
              <CardActions>
                <IconButton>
                  <ShareIcon />
                </IconButton>
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
                <Button
                  disableElevation
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
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

export default Posts;
