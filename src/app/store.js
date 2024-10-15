import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  newsArticleAPI,
  newsCommentsAPI,
  newsAuthorsAPI,
} from "../services/NewsArticlesAPI";
import articlesReducer from "../features/articles/articlesSlice";

export default configureStore({
  reducer: {
    [newsArticleAPI.reducerPath]: newsArticleAPI.reducer,
    [newsCommentsAPI.reducerPath]: newsCommentsAPI.reducer,
    [newsAuthorsAPI.reducerPath]: newsAuthorsAPI.reducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsArticleAPI.middleware,
      newsCommentsAPI.middleware,
      newsAuthorsAPI.middleware
    ),
});
