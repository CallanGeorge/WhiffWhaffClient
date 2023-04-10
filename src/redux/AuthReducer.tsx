const initialState = {
  id: 0,
  username: "",
  isLoggedIn: false,
};

export default function AuthReducer(state, action) {
  if (!state) {
    return initialState;
  }

  if (action.type === "logout-success") {
    return initialState;
  }
  return state;
}
