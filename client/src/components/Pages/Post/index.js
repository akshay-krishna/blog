import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, IconButton, Typography } from "@material-ui/core";

import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

import "./Post.css";
import Comment from "./Comments/Comment";

const Post = () => {
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
  const { blogBody, title } = post;
  return (
    <Container className="post" maxWidth="md">
      <div className="post__contents">
        <Typography gutterBottom variant="h2">
          {title}
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          {blogBody}
        </Typography>
        <div className="post__contentsIcons">
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
          <IconButton>
            <BookmarkBorderOutlinedIcon />
          </IconButton>
          <IconButton>
            <ThumbUpAltOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <Comment setComments={setComments} pid={pid} comments={comments} />
    </Container>
  );
};

export default Post;
