import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://taskmaster-server-alpha.vercel.app',
        prepareHeaders: (headers) => { //To solve the cors issue
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Tasks', 'Users'],
    endpoints: () => ({}),
});

export default baseApi;
