import React from "react";
import "./App.css";

import Posts from "../Pages/Post/Posts";
import Post from "../Pages/Post/Post";
import NewPost from "../Pages/Post/NewPost";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../Layout/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app__content">
          <Switch>
            <Route exact path="/post" render={() => <Posts />} />
            <Route exact path="/post/new" render={() => <NewPost />} />
            <Route exact path="/post/:id" render={() => <Post />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
