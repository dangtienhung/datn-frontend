import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './Auth'

const StripeApi = createApi({
  reducerPath: 'Stripe',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['blogs'],
  endpoints: (builder) => ({
    stripePayment: builder.mutation<any, any>({
      query: ({ ...rest }) => ({
        url: 'api/create-checkout-session',
        method: 'POST',
        body: rest
      })
    }),
    billingPayment: builder.query<any, void>({
      query: () => ({
        url: 'api/inforBilling',
        credentials: 'include'
      })
    })
  })
})

export const { useStripePaymentMutation, useBillingPaymentQuery } = StripeApi
export default StripeApi
