import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './requestRefresh';
import { IUser, IUserDocs, responseUser } from '../interfaces/user.type';

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

    //get all user
    getAllUsers: builder.query<IUserDocs, number>({
      query: (page = 5) => `/api/users?_page=${page}`,
      providesTags: ['user'],
    }),

    //delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useFetchUserQuery, useGetAllUsersQuery, useDeleteUserMutation } = ApiUser;
export const SizeReducer = ApiUser.reducer;
