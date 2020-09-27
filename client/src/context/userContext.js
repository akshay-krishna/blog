import React, { createContext, useReducer } from "react";

import userReducer from "../reducers/userReducer";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useReducer(userReducer, UserContext);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
