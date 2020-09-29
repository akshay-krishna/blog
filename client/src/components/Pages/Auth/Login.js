import React, { useContext, useState } from "react";
import "./Login.css";

import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [cred, setCred] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cred),
      });
      const jres = await res.json();
      const { name, avatar, id } = jres;
      dispatch({ type: "AUTH", data: { name, avatar, id } });
      history.goBack();
    } catch (err) {
      console.error(err.message);
    }
    history.push("/");
  };

  const { email, password } = cred;
  return (
    <Container className="login" maxWidth="sm">
      <Card className="login__card">
        <Typography align="center" variant="h4">
          Login
        </Typography>
        <form onSubmit={onSubmit} className="login__form">
          <TextField
            onChange={onChange}
            name="email"
            value={email}
            variant="outlined"
            fullWidth
            placeholder="email"
            margin="dense"
            type="email"
          />
          <TextField
            onChange={onChange}
            name="password"
            value={password}
            type="password"
            fullWidth
            variant="outlined"
            placeholder="password"
            margin="dense"
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Login
          </Button>
        </form>
        <Typography
          paragraph
          variant="body2"
          color="textSecondary"
          align="center"
        >
          Don't have an account
          <Link to="/signup">Signup</Link>
        </Typography>
      </Card>
    </Container>
  );
};

export default Login;
