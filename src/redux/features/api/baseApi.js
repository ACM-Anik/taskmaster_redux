// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const baseApi = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://taskmaster-server-omvadhl70-acmaniks-projects.vercel.app/' }),
//     tagTypes: ['Tasks'], // To refresh
//     endpoints: () => ({}),
// });


// export default baseApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://taskmaster-server-alpha.vercel.app',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Tasks', 'Users'],
    endpoints: () => ({}),
});

export default baseApi;
