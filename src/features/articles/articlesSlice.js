import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: null,
  selectedArticle: null,
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
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { initialize, addArticle, setSelectedArticle } =
  articlesSlice.actions;

export default articlesSlice.reducer;
