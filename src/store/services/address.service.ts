import { IAddress, IAddressCreate, IDocAddress } from '../../interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BACKEND}` }),
  tagTypes: ['Address'],
  endpoints: (build) => ({
    createAddress: build.mutation<IAddress, Partial<IAddressCreate>>({
      query(body) {
        return {
          url: `/address/create`,
          method: 'POST',
          body
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Address', id: 'LIST' }]
    }),

    getAddress: build.query<IDocAddress, { userId: string }>({
      query: ({ userId }) => `/address/get/${userId}`,
      providesTags: (result, error, _id) => [{ type: 'Address', _id }]
    })
  })
})

export const { useCreateAddressMutation, useGetAddressQuery } = addressApi
