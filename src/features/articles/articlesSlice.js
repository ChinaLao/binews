import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.articles = action.payload;
    },
    addArticle: (state, action) => {
      state.articles?.push(action.payload);
    },
  },
});

export const { initialize, addArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
