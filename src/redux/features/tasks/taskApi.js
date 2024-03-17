import baseApi from "../api/baseApi";

const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: ["Tasks"], //To refresh 
        }),

        addTask: builder.mutation({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),

        updateTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),

        removeTask: builder.mutation({
            query: ( id ) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"], //To refresh
        }),
    }),
});

export const { useAddTaskMutation, useGetTasksQuery, useUpdateTaskMutation, useRemoveTaskMutation } = taskApi; 