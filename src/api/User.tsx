import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './requestRefresh';
import { responseUser } from '../interfaces/user.type';

export const ApiUser = createApi({
  reducerPath: 'ApiUser',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchUser: builder.query<responseUser, void>({
      query: () => ({
        url: '/auth/getUser',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useFetchUserQuery } = ApiUser;
export const SizeReducer = ApiUser.reducer;
