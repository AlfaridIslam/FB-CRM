// src/slices/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.data?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "users/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    facebookLogin: builder.query({
      query: () => ({
        url: "fbusers",
        method: "GET",
        redirect: "follow", // This will allow redirects to happen
      }),
    }),
    facebookCallback: builder.query({
      query: () => ({
        url: "fbusers/callback",
        method: "GET",
      }),
    }),
    facebookLogout: builder.mutation({
      query: () => ({
        url: "fbusers/signout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useFacebookLoginQuery,
  useFacebookCallbackQuery,
  useFacebookLogoutMutation,
} = apiSlice;
