import baseApi from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ["Tasks"], //To refresh 
        }),

        addUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
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

export const { useAddUserMutation, useGetUsersQuery, useUpdateUserMutation, useRemoveUserMutation } = usersApi; 