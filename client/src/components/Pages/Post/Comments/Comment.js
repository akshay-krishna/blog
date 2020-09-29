import React, { Fragment, useContext, useState } from "react";

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
import { UserContext } from "../../../../context/userContext";
const Comment = ({ id, comments, setComments }) => {
  const { user } = useContext(UserContext);
  const btnDisable = user ? false : true;
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
    } catch (err) {
      console.error(err);
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
          const { commentBody, _id, date, author } = comment;
          return (
            <Card key={_id}>
              <Typography variant="subtitle2" color="textSecondary">
                {date}
              </Typography>
              <Typography color="textPrimary">{commentBody}</Typography>
              <div className="post__commentsIcons">
                <AdminBtn user={user} author={author} />
                <IconButton disabled={btnDisable}>
                  <ThumbUpAltOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton disabled={btnDisable}>
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

const AdminBtn = ({ user, author }) => {
  if (!user) return null;
  if (user.id === author) {
    return (
      <Fragment>
        <Button variant="text" size="small">
          <Typography variant="button" color="error">
            delete
          </Typography>
        </Button>
        <Button variant="text" size="small">
          <Typography variant="button" color="primary">
            update
          </Typography>
        </Button>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default Comment;
