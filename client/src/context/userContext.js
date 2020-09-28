import React, { createContext, useReducer } from "react";

import userReducer from "../reducers/userReducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {}, () => {
    const initialData = localStorage.getItem("user");
    return initialData ? JSON.parse(initialData) : undefined;
  });
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
