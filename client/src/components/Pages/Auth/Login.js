import React, { useState } from "react";
import "./Login.css";

import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
