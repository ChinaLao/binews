import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuth: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    clearCurrentUser: (state) => {
      state.userAuth = null;
      state.currentUser = null;
      localStorage.setItem("currentUser", null);
    },
  },
});

export const { setUserAuth, setCurrentUser, clearCurrentUser } =
  userSlice.actions;

export default userSlice.reducer;
