import { Container, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "./Comment.css";
import SendIcon from "@material-ui/icons/Send";

const Comment = ({ id, comments }) => {
  const [comment, setComment] = useState({ commentBody: "" });
  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/post/comment/" + id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const { commentBody } = comment;
  return (
    <div className="comment">
      <Container maxWidth="md">
        <form onSubmit={onSubmit} className="comment__form">
          <TextField
            onChange={onChange}
            name="commentBody"
            value={commentBody}
            margin="dense"
            variant="outlined"
            rows="5"
            fullWidth
            size="small"
            multiline
          />
          <div className="comment__formButton">
            <Button
              variant="contained"
              size="medium"
              color="primary"
              type="submit"
              disableElevation
              endIcon={<SendIcon />}
            >
              Comment
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Comment;
