import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

const baseURL = "https://jsonplaceholder.typicode.com";
const createRequest = (url) => ({ url, headers: headers });

export const newsArticleAPI = createApi({
  reducerPath: "newsArticleAPI",

  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),

  tagTypes: ["Articles"],

  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (postId) => createRequest(`/posts${postId ? `/${postId}` : ""}`),
      providesTags: ["Articles"],
    }),

    postArticle: builder.mutation({
      query: (articleData) => ({
        url: "/posts",
        method: "POST",
        headers: headers,
        body: JSON.stringify(articleData),
      }),
      invalidatesTags: ["Articles"],
    }),

    putArticle: builder.mutation({
      query: (articleData) => ({
        url: `/posts/${articleData.id}`,
        method: "PUT",
        headers: headers,
        body: JSON.stringify(articleData),
      }),
      invalidatesTags: ["Articles"],
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

export const {
  useGetArticlesQuery,
  usePostArticleMutation,
  usePutArticleMutation,
} = newsArticleAPI;
export const { useGetCommentsQuery } = newsCommentsAPI;
