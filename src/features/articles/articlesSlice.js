import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articlesList: null,
  selectedArticle: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    initialize: (state, action) => {
      const { articles, comments, authors } = action.payload;
      const mappedArticles = articles
        ?.map((article) => {
          return {
            ...article,
            comments: comments?.filter(
              (comment) => comment.postId === article.id
            ),
            author: authors
              ? authors[
                  authors?.findIndex((author) => author.id === article.userId)
                ]
              : { name: "Unknown Author" },
          };
        })
        .sort((a, b) => b.id - a.id);

      state.articlesList = mappedArticles;
    },
    addArticle: (state, action) => {
      console.log(state.articlesList, action.payload);
      state.articlesList.push(action.payload);
      state.articlesList.sort((a, b) => b.id - a.id);
    },
    setSelectedArticle: (state, action) => {
      const { article, comments, authors } = action.payload;
      const articleComments = comments?.filter(
        (comment) => comment.postId === article.id
      );
      const articleAuthor = authors
        ? authors[authors?.findIndex((author) => author.id === article.userId)]
        : { name: "Unknown Author" };

      state.selectedArticle = {
        ...article,
        comments: [...articleComments],
        author: articleAuthor,
      };
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
