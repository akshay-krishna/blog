import React, { useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        dispatch({ type: "LOGOUT" });
        window.location.reload();
      } catch (err) {
        console.error(err.message);
      }
    };
    logout();
  });
  return <Redirect to="/" />;
};

export default Logout;
