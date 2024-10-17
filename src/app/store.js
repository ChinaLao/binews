import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersAPI } from "../services/UsersAPI";
import {
  newsArticleAPI,
  newsCommentsAPI,
  newsAuthorsAPI,
} from "../services/NewsArticlesAPI";
import articlesReducer from "../features/articles/articlesSlice";

export default configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
    [newsArticleAPI.reducerPath]: newsArticleAPI.reducer,
    [newsCommentsAPI.reducerPath]: newsCommentsAPI.reducer,
    [newsAuthorsAPI.reducerPath]: newsAuthorsAPI.reducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersAPI.middleware,
      newsArticleAPI.middleware,
      newsCommentsAPI.middleware,
      newsAuthorsAPI.middleware
    ),
});
