import React, { Fragment, useState } from "react";

import {
  Card,
  IconButton,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

const Comment = ({ id, comments, setComments }) => {
  const [comment, setComment] = useState({ commentBody: "" });
  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await (
        await fetch("/post/comment/" + id, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(comment),
        })
      ).json();
      setComments(res);
      setComment({ ...comment, commentBody: "" });
    } catch (err) {
      console.error(err.message);
    }
  };
  const { commentBody } = comment;
  return (
    <Fragment>
      <div className="post__newComment">
        <form onSubmit={onSubmit}>
          <TextField
            onChange={onChange}
            name="commentBody"
            value={commentBody}
            fullWidth
            multiline
          />
          <div className="post__newCommentIcon">
            <Button
              color="primary"
              endIcon={<SendOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              comment
            </Button>
          </div>
        </form>
      </div>
      <div className="post__comments">
        {comments.map((comment) => {
          const { commentBody, _id, date } = comment;
          return (
            <Card key={_id}>
              <Typography color="textSecondary">{date}</Typography>
              <Typography color="textPrimary">{commentBody}</Typography>
              <div className="post__commentsIcons">
                <Button
                  variant="text"
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  size="small"
                >
                  <Typography variant="button" color="textSecondary">
                    reply
                  </Typography>
                </Button>
                <IconButton>
                  <ThumbUpAltOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton>
                  <ThumbDownAltOutlinedIcon fontSize="small" />
                </IconButton>
              </div>
            </Card>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Comment;
