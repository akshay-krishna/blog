import React from "react";
import "./App.css";

import Posts from "../Pages/Posts/Posts";
import Post from "../Pages/Post/Post";
import NewPost from "../Pages/newPost/NewPost";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

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
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/*" render={() => <Posts />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
