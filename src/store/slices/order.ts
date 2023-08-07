import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from '../../api/requestRefresh';
import { IOrder, IOrderDetailResponse } from '../../interfaces/order.type';

export const OrderAPI = createApi({
  reducerPath: 'Order',
  tagTypes: ['Order'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllOrder: builder.query<any, void>({
      query: () => '/api/orders',
      // providesTags: (result) => {
      // if (result) {
      //   const final = [
      //     ...result.data.map(({ _id }) => ({ type: 'Order' as const, _id })),
      //     { type: 'Order' as const, id: 'LIST' },
      //   ];
      //   return final;
      // }

      // return [{ type: 'Order', id: 'LIST' }];
      // },
    }),
    getOrderByid: builder.query<IOrderDetailResponse, string>({
      query: (id) => ({
        url: `/api/order/${id}`,
      }),
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation({
      query: (body: any) => ({
        url: '/api/create-order',
        body: body,
        method: 'POST',
      }),
      // invalidatesTags: () => [{ type: 'Order', id: 'LIST' }],
    }),
    confirmOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/order/confirmed/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
    deliveredOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/order/delivered/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
    doneOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/order/done/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],

      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
    canceledOrder: builder.mutation({
      query: (id: string) => ({
        url: `/api/order/canceled/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
      // invalidatesTags: (result, error, body) => [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});
// console.log(ToppingAPI);

export const {
  useConfirmOrderMutation,
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useCanceledOrderMutation,
  useDeliveredOrderMutation,
  useDoneOrderMutation,
  useLazyGetAllOrderQuery,
  useGetOrderByidQuery,
} = OrderAPI;
