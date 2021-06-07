/*import { createSelector, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    name: null,
    username: null,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.username = action.payload.username;
    },
    userSignedOut: (state, action) => {
      state.email = null;
      state.name = null;
      state.username = null;
    },
  },
});

export default userSlice.reducer;

const { userLoggedIn, userSignedOut } = userSlice.actions;

export const userLogsIn = (email, name, username) =>
  userLoggedIn({ email, name, username });

export const userSignsOut = () => userSignedOut({});

export const getUser = createSelector(
  (state) => state.user,
  (user) => user.email,
  (user) => user.name,
  (user) => user.username
);*/
