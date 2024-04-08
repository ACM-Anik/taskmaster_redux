import baseApi from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/users',
            providesTags: ["Tasks"], //To refresh 
        }),

        addUser: builder.mutation({
            query: (task) => ({
                url: "/users",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),

        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),

        removeUser: builder.mutation({
            query: ( id ) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),
    }),
});

export const { useAddTaskMutation, useGetTasksQuery, useUpdateTaskMutation, useRemoveTaskMutation } = usersApi; 