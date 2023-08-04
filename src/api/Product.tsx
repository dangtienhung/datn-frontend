import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './requestRefresh';
import { IProductDocs } from '../interfaces/products.type';
import { IResImage } from '../interfaces/image.type';

export const ApiProducts = createApi({
  reducerPath: 'ApiProduct',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['product'],
  endpoints: (builder) => ({
    fetchProducts: builder.query<IProductDocs, void>({
      query: () => '/api/products',
      providesTags: (result) =>
        result?.docs
          ? [
              ...result.docs.map(({ _id }) => ({ type: 'product' as const, _id })),
              { type: 'product', id: 'List' },
            ]
          : [{ type: 'product', id: 'Lists' }],
    }),
    uploadImagesProduct: builder.mutation<IResImage, any>({
      query: (files) => ({
        url: '/api/uploadImages',
        method: 'POST',
        body: files,
      }),
    }),
    deleteImagesProduct: builder.mutation<any, string>({
      query: (publicId) => ({
        url: `/api//deleteImages/${publicId}`,
        method: 'DELETE',
        body: publicId,
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useUploadImagesProductMutation,
  useDeleteImagesProductMutation,
} = ApiProducts;
