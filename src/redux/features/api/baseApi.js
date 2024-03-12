import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () =>'/tasks',
        }),
        updateTask: builder.mutation({
            query: ({id, data}) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data,
            })
        }),
    }),
});

export const {useGetTasksQuery, useUpdateStatusMutation} =  baseApi;

export default baseApi;