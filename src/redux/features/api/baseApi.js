import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Tasks'], //To refresh 
    endpoints: () => ({}),
});

// export const {useGetTasksQuery, useUpdateStatusMutation, useAddTaskMutation, useRemoveTaskMutation} =  baseApi;

export default baseApi;