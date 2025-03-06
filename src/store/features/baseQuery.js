import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('content-type', 'application/json');
        return headers;
    },
});
