import { createApi } from '@reduxjs/toolkit/query/react';
import { responseUser } from '../interfaces/user.type';
import { baseQueryWithReauth } from './Auth';

export const ApiUser = createApi({
  reducerPath: 'ApiUser',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  baseQuery: baseQueryWithReauth,
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
