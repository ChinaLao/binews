import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuth: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    },
    setCurrentUser: (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    clearCurrentUser: (state) => {
      state.userAuth = null;
      localStorage.clear();
    },
  },
});

export const { setUserAuth, setCurrentUser, clearCurrentUser } =
  userSlice.actions;

export default userSlice.reducer;
