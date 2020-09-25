import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import Comment from "../../Comments/Comment";
import "./Post.css";
const Post = () => {
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    console.log("object");
    const fetchData = async () => {
      try {
        const { comments, body, title } = await (
          await fetch("/post/" + id)
        ).json();
        setBody(body);
        setTitle(title);
        setComments(comments);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <Container className="post" maxWidth="md">
        <Typography gutterBottom variant="h2">
          {title}
        </Typography>
        <Typography variant="body1" paragraph>
          {body}
        </Typography>
      </Container>
      <Comment id={id} comments={comments} />
    </Fragment>
  );
};

export default Post;
