import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Container, Typography } from "@material-ui/core";

import "./Post.css";
import Comment from "./Comments/Comment";
import { UserContext } from "../../../context/userContext";

const Post = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({
    title: "",
    blogBody: "",
  });
  const [comments, setComments] = useState([]);
  const { pid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await (await fetch("/post/" + pid)).json();
        const { comments } = post;
        setComments(comments);
        setPost(post);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [pid, comments.length]);
  const { blogBody, title, author } = post;
  return (
    <Container className="post" maxWidth="md">
      <div className="post__contents">
        <Typography gutterBottom variant="h2">
          {title}
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          {blogBody}
        </Typography>
        {author?._id === user?.id ? (
          <div className="post__contentsIcons">
            <Button variant="contained" color="secondary">
              Delete
            </Button>
            <Button color="primary" variant="contained">
              Update
            </Button>
          </div>
        ) : null}
      </div>
      <Comment setComments={setComments} pid={pid} comments={comments} />
    </Container>
  );
};

export default Post;
