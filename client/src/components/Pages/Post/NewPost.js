import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./newPost.css";
import { useHistory } from "react-router-dom";
const NewPost = () => {
  const [post, setPost] = useState({ title: "", body: "" });
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      history.push("/post");
    } catch (err) {
      console.error(err.message);
    }
  };

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const { title, body } = post;
  return (
    <div className="newPost">
      <form onSubmit={onSubmit}>
        <TextField
          onChange={onChange}
          name="title"
          value={title}
          placeholder="Title"
          fullWidth
          required
        />
        <TextField
          multiline
          onChange={onChange}
          name="body"
          value={body}
          placeholder="Start writing"
          fullWidth
          required
        />
        <Button type="submit" fullWidth variant="outlined" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
