import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        dispatch({ type: "LOGOUT" });
        window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    };
    logout();
  });
  return <Redirect to="/" />;
};

export default Logout;
