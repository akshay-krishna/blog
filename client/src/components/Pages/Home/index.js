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

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

import { Link } from "react-router-dom";
import "./Home.css";
import { OwnerBtn } from "../Post";

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
      <PostCards posts={posts} />
    </Container>
  );
};

const PostCards = ({ posts, dashboard }) => {
  let res = [];
  res = posts.map((post) => (
    <Card key={post._id} className="posts__card" variant="elevation">
      <CardContent className="posts__cardContent">
        <Typography variant="h3" color="textSecondary" gutterBottom>
          <Link className="posts__title" to={"/post/" + post._id}>
            {post.title}
          </Link>
        </Typography>
        <Typography align="justify" variant="body2" color="textSecondary">
          {post.blogBody}
        </Typography>
        <CardActions className="posts__cardAction">
          {dashboard ? (
            <OwnerBtn pid={post._id} />
          ) : (
            <Button
              disableElevation
              variant="contained"
              endIcon={<ArrowForwardIosOutlinedIcon />}
              size="medium"
            >
              <Link to={"/post/" + post._id}>Read more</Link>
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  ));
  return res;
};
export { PostCards };
export default Home;
