import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './requestRefresh';
import { ISize, ISizeDocs } from '../interfaces/size.type';

const SizeApi = createApi({
  reducerPath: 'Size',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['size'],
  endpoints: (builder) => ({
    getAllSizes: builder.query<ISizeDocs, void>({
      query: () => '/api/sizes',
      providesTags: ['size'],
    }),

    deleteSize: builder.mutation({
      query: (id: string) => ({
        url: `/api/size/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['size'],
    }),

    addSize: builder.mutation({
      query: (size: ISize) => ({
        url: '/api/size',
        method: 'POST',
        body: size,
      }),
      invalidatesTags: ['size'],
    }),

    updateSize: builder.mutation({
      query: (size: ISize) => ({
        url: `/api/size/${size._id}`,
        method: 'PUT',
        body: { name: size.name, price: size.price },
      }),
      invalidatesTags: ['size'],
    }),
  }),
});

export const {
  useGetAllSizesQuery,
  useDeleteSizeMutation,
  useAddSizeMutation,
  useUpdateSizeMutation,
} = SizeApi;
export default SizeApi;
