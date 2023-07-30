import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser, responseUser } from '../interfaces/user.type';
import baseQueryWithReAuth from './requestRefresh';

export const Auth = createApi({
  reducerPath: 'Auth',
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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = Auth;
