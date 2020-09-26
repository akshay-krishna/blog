import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const { name, email, password } = cred;

  return (
    <Container className="signup" maxWidth="sm">
      <Card className="signup__card">
        <Typography align="center" variant="h4">
          Signup
        </Typography>
        <form onSubmit={onSubmit} className="signup__form">
          <TextField
            name="name"
            value={name}
            onChange={onChange}
            variant="outlined"
            fullWidth
            type="text"
            placeholder="name"
            margin="dense"
          />
          <TextField
            name="email"
            value={email}
            onChange={onChange}
            variant="outlined"
            fullWidth
            placeholder="email"
            margin="dense"
            type="email"
          />
          <TextField
            value={password}
            name="password"
            type="password"
            onChange={onChange}
            fullWidth
            variant="outlined"
            placeholder="password"
            margin="dense"
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Signup
          </Button>
        </form>
        <Typography
          paragraph
          variant="body2"
          color="textSecondary"
          align="center"
        >
          Already have an account
          <Link to="/login">Login</Link>
        </Typography>
      </Card>
    </Container>
  );
};

export default Signup;
