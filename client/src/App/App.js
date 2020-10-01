import React from "react";
import "./App.css";

import Home from "../components/Pages/Home";
import Post from "../components/Pages/Post";
import NewPost from "../components/Pages/NewPost";
import Login from "../components/Pages/Auth/Login";
import Signup from "../components/Pages/Auth/Signup";
import Logout from "../components/Pages/Auth/Logout";
import UpdatePost from "../components/Pages/UpdatePost";
import DashBoard from "../components/Pages/DashBoard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app__content">
          <Switch>
            <Route exact path="/dashboard" render={() => <DashBoard />} />
            <Route exact path="/post" render={() => <Home />} />
            <Route exact path="/post/new" render={() => <NewPost />} />
            <Route exact path="/post/:pid" render={() => <Post />} />
            <Route
              exact
              path="/post/:pid/update"
              render={() => <UpdatePost />}
            />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/logout" render={() => <Logout />} />
            <Route exact path="/*" render={() => <Home />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
