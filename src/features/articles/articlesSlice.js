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
    editArticle: (state, action) => {
      state.selectedArticle.title = action.payload.title;
      state.selectedArticle.body = action.payload.body;
    },
  },
});

export const { initialize, addArticle, setSelectedArticle, editArticle } =
  articlesSlice.actions;

export default articlesSlice.reducer;
