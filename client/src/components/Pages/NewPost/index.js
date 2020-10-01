import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import "./newPost.css";

const NewPost = () => {
  const [post, setPost] = useState({ title: "", blogBody: "" });
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
  const { title, blogBody } = post;
  return (
    <Container className="newPost" maxWidth="md">
      <Card>
        <form className="newPost__form" onSubmit={onSubmit}>
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
            rows="10"
            variant="outlined"
            onChange={onChange}
            name="blogBody"
            value={blogBody}
            fullWidth
            size="small"
            required
          />
          <Button type="submit" fullWidth variant="outlined" color="primary">
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default NewPost;
