import { createApi } from '@reduxjs/toolkit/query/react';
import { IUserDocs } from '../interfaces/user.type';
import baseQueryWithReAuth from './requestRefresh';

export const ApiUser = createApi({
  reducerPath: 'ApiUser',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchUser: builder.query<IUserDocs, void>({
      query: () => ({
        url: '/api/users',
        // credentials: 'include',
      }),
      providesTags: (result) =>
        result?.docs
          ? [
              ...result.docs.map(({ _id }) => ({ type: 'user' as const, _id })),
              { type: 'user', id: 'List' },
            ]
          : [{ type: 'user', id: 'Lists' }],
    }),
  }),
});

export const { useFetchUserQuery } = ApiUser;
