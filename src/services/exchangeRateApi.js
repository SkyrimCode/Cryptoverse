import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const exchangeRateHeaders = {
  'x-rapidapi-key':process.env.REACT_APP_RAPIDAPI_KEY,
  'x-rapidapi-host': process.env.REACT_APP_EXCHANGE_RATE_RAPIDAPI_HOST,
};

const exchangeRateParams = {
    from: 'USD', to: 'INR', q: '1'
}

const createRequest = (url) => ({ url, params: exchangeRateParams, headers: exchangeRateHeaders });

export const exchangeRateApi = createApi({
  reducerPath: 'exchangeRateApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_EXCHANGE_RATE_URL }),
  endpoints: (builder) => ({
    getExchangeRate: builder.query({
      query: () => createRequest('/exchange'),
    }),
  }),
});

export const { useGetExchangeRateQuery } = exchangeRateApi;