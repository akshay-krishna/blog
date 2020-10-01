import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

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
        <OwnerBtn author={author} pid={pid} user={user} />
      </div>
      <Comment setComments={setComments} pid={pid} comments={comments} />
    </Container>
  );
};

const OwnerBtn = ({ author, user, pid }) => {
  const history = useHistory();
  const onClick = async (method) => {
    try {
      fetch("/post/" + pid, {
        method: method,
        headers: { "Content-Type": "application/json" },
      });
      history.goBack();
    } catch (err) {
      console.error(err.message);
    }
  };
  return author?._id === user?.id ? (
    <div className="post__contentsIcons">
      <Button
        onClick={() => onClick("DELETE")}
        variant="contained"
        color="secondary"
      >
        Delete
      </Button>
      <Button
        onClick={() => history.push(`/post/${pid}/update`)}
        color="primary"
        variant="contained"
      >
        Update
      </Button>
    </div>
  ) : null;
};

export default Post;
