const userReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      state = { user: action.data };
      localStorage.setItem("user", JSON.stringify(state.user));
      break;
    case "LOGOUT":
      state = { user: null };
      localStorage.clear();
      break;
  }
  return state;
};

export default userReducer;
