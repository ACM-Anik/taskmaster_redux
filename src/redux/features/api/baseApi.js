import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Tasks'], //To refresh 

    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () =>'/tasks',
            providesTags: ["Tasks"], //To refresh 
        }),

        updateTask: builder.mutation({
            query: ({id, data}) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),

        addTask: builder.mutation({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),
    }),
});

export const {useGetTasksQuery, useUpdateStatusMutation, useAddTaskMutation} =  baseApi;

export default baseApi;