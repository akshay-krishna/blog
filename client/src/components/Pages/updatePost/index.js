import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";

const UpdatePost = () => {
  const [post, setPost] = useState({ title: "", blogBody: "" });
  const history = useHistory();
  const { pid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/post/${pid}`);
        const { title, blogBody } = await res.json();
        setPost({ title, blogBody });
      } catch (err) {
        console.error(err.message);
        history.goBack();
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/post/${pid}`, {
        method: "PUT",
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

export default UpdatePost;
