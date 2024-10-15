import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

const baseURL = "https://jsonplaceholder.typicode.com";
const createRequest = (url) => ({ url, headers: headers });

export const usersAPI = createApi({
  reducerPath: "usersAPI",

  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => createRequest(`/users`),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersAPI;
