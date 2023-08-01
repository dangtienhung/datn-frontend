import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, responseUser } from '../interfaces/user.type';
import baseQueryWithReAuth from './requestRefresh';

export const Auth = createApi({
  reducerPath: 'Auth',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    register: builder.mutation<void, IUser>({
      query: ({ ...rest }) => ({
        url: '/api/register',
        body: rest,
        method: 'POST',
      }),
    }),
    login: builder.mutation<responseUser, IUser>({
      query: ({ ...rest }) => ({
        url: '/api/login',
        body: rest,
        method: 'POST',
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credential: 'include',
      }),
    }),
    fetchUser: builder.query<responseUser, void>({
      query: () => ({
        url: '/auth/getUser',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useFetchUserQuery } = Auth;
