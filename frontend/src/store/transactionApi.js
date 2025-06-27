import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = '/api';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getTransactionAmount: build.mutation({
        query: (email) => ({
          url: '/userInfo',
          method: 'POST',
          body: { email },
        }),
      }),
    getUsersData: build.mutation({
        query: (email) => ({
          url: '/usersData',
          method: 'POST',
          body: { email },
        }),
      }),
    getAddIncome: build.mutation({
        query: (details) => ({
          url: '/addIncome',
          method: 'POST',
          body: details ,
        }),
      }),
    getAddExpense: build.mutation({
        query: (details) => ({
          url: '/addExpense',
          method: 'POST',
          body: details,
        }),
      }),
    getAllTransaction: build.mutation({
        query: (email) => ({
          url: '/getAllTransaction',
          method: 'POST',
          body: {email},
        }),
      }),
    
  }),
})

export const {
    useGetTransactionAmountMutation,
    useGetUsersDataMutation,
    useGetAddIncomeMutation,
    useGetAddExpenseMutation,
    useGetAllTransactionMutation,
} = transactionApi;