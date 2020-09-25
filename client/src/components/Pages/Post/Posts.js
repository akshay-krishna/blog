import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
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
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h3">{post.title}</Typography>
              <Typography variant="body2" paragraph>
                {post.body}
              </Typography>
              <CardActions>
                <Button color="primary" size="large" href={"/post/" + post._id}>
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
