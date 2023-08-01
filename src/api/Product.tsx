import { createApi } from '@reduxjs/toolkit/dist/query';
import baseQueryWithReAuth from './requestRefresh';
import { IProductDocs } from '../interfaces/products.type';

export const ApiProduct = createApi({
  reducerPath: 'ApiProduct',
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
  }),
});

// export const {} = ApiProduct
