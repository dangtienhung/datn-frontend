import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './Auth'

const VnpayApi = createApi({
  reducerPath: 'Vnpay',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['blogs'],
  endpoints: (builder) => ({
    vnpayPayment: builder.mutation<any, any>({
      query: ({ ...rest }) => ({
        url: 'api/create-checkout-vnpay',
        method: 'POST',
        body: rest
      })
    }),
    billingVnpay: builder.mutation<any, any>({
      query: ({ ...rest }) => ({
        url: 'api/billing-vnpay',
        method: 'POST',
        body: rest
      })
    })
  })
})

export const { useVnpayPaymentMutation, useBillingVnpayMutation } = VnpayApi
export default VnpayApi
