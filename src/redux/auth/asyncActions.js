import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
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
                    basket: [],
                    history: {}
                },
            }),
            invalidatesTags: [{ type: 'User' }],
        }),
        getUsers: build.query({
            query: () => `/users`,
            invalidatesTags: [{ type: 'User' }],
        }),
        addProductForAuthUser: build.mutation({
            query: (body) => ({
                url: `/users/${body.userId}`,
                method: 'UPDATE',
                body: {
                    basket: []
                    //GENERALSUM?
                }
            }),
            invalidatesTags: [{ type: 'User' }]
        })
    })
})

