import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await (await fetch("/post")).json();
        setPosts(res);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);
  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <Link to={"/post/" + post._id}>
            <div className="posts__post">
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
