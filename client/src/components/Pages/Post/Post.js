import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const res = await (await fetch("/post/" + id)).json();
        setPost(res);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);
  return (
    <div className="post">
      <div className="post__title">
        <h1>{post.title}</h1>
      </div>
      <div className="post__body">
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default Post;
