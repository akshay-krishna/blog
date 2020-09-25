import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import "./Post.css";
const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const res = await (await fetch("/post/" + id)).json();
        setPost(res);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);
  return (
    <div className="post">
      <Container maxWidth="md">
        <Typography variant="h2">{post.title}</Typography>
        <Typography variant="body1" paragraph>
          {post.body}
        </Typography>
      </Container>
    </div>
  );
};

export default Post;
