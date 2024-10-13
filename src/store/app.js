import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  newsArticleAPI,
  newsCommentsAPI,
  newsAuthorsAPI,
} from "../services/NewsArticlesAPI";

export default configureStore({
  reducer: {
    [newsArticleAPI.reducerPath]: newsArticleAPI.reducer,
    [newsCommentsAPI.reducerPath]: newsCommentsAPI.reducer,
    [newsAuthorsAPI.reducerPath]: newsAuthorsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsArticleAPI.middleware,
      newsCommentsAPI.middleware,
      newsAuthorsAPI.middleware
    ),
});
