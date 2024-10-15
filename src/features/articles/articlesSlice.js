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
      state.articles?.sort((a, b) => b.id - a.id);
    },
    addArticle: (state, action) => {
      state.articles?.push(action.payload);
      state.articles?.sort((a, b) => b.id - a.id);
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
