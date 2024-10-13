import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

const baseURL = "https://jsonplaceholder.typicode.com";
const createRequest = (url) => ({ url, headers: headers });

export const newsArticleAPI = createApi({
  reducerPath: "newsArticleAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => createRequest("/posts"),
    }),
  }),
});
export const newsCommentsAPI = createApi({
  reducerPath: "newsCommentsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => createRequest("/comments"),
    }),
  }),
});
export const newsAuthorsAPI = createApi({
  reducerPath: "newsAuthorsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => createRequest("/users"),
    }),
  }),
});

export const { useGetArticlesQuery } = newsArticleAPI;
export const { useGetCommentsQuery } = newsCommentsAPI;
export const { useGetAuthorsQuery } = newsAuthorsAPI;
