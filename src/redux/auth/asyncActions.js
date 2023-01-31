import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (build) => ({
        addUser: build.mutation({
            query: (body) => ({
                url: `/users`,
                method: 'POST',
                body: {
                    email: body.email,
                    password: body.password,
                    name: body.name,
                    role: body.role,
                    avatar: body.avatar,
                    basket: {
                        item: []
                    },
                    history: {}
                },
            }),
            // invalidatesTags: (result, error, arg) => [{type: 'User', id: arg.id}]
            invalidatesTags: [{ type: 'User' }],
        }),
    })
})

export const { useAddUserMutation } = authApi