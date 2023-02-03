import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function providesList(resultsWithIds, tagType) {
    return resultsWithIds
        ? [
            { type: tagType, id: 'LIST' },
            ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
        ]
        : [{ type: tagType, id: 'LIST' }];
}

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User', 'Products'],
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
            providesTags: (result) => providesList(result, 'User')
        }),
        getUser: build.query({
            query: (id) => ({
                url: `/users/${id}`
            }),
            providesTags: (result) => result ? [result, { type: 'User' }] : [{ type: 'User' }]
        }),
        addProductForAuthUser: build.mutation({
            query: (body) => ({
                url: `/users/${body.userId}`,
                method: 'PATCH',
                body: {
                    basket: body.data
                }
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }]
        })
    })
})

