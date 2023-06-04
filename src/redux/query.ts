import { ICartItem, IProduct } from "./../@types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../@types/types";

function providesList(resultsWithIds: any, tagType: string) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }: any) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const queryApi = createApi({
  reducerPath: "queryApi",
  tagTypes: ["User", "Products"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.PORT }),
  endpoints: (build) => ({
    addUser: build.mutation<void, IUser>({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body: {
          id: body.id,
          email: body.email,
          password: body.password,
          name: body.name,
          role: body.role,
          avatar: body.avatar,
          basket: {
            item: [],
          },
          history: {},
        },
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getUsers: build.query<IUser[], void>({
      query: () => `/users`,
      providesTags: (result) => providesList(result, "User"),
    }),
    getUser: build.query<IUser, { id: number | string }>({
      query: (id) => `/users/${id}`,
      providesTags: ["Products"],
    }),
    addProductForAuthUser: build.mutation<
      void,
      { userId: number | string; data: any }
    >({
      query: (body) => ({
        url: `/users/${body.userId}`,
        method: "PATCH",
        body: {
          basket: {
            item: body.data,
          },
        },
      }),
      //invalidatesTags: [{ type: ['Products', 'User'], id: 'LIST' }]
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    chagneOrderStatus: build.mutation<
      void,
      { userId: number | string; data: any }
    >({
      query: (body) => ({
        url: `/users/${body.userId}`,
        method: "PATCH",
        body: {
          history: body.data,
        },
      }),
      invalidatesTags: [{ type: "Products" }],
    }),
    confirmDiliveryBasket: build.mutation<
      void,
      { userId: number | string; item: IProduct[]; history: any }
    >({
      query: (body) => ({
        url: `/users/${body.userId}`,
        method: "PATCH",
        body: {
          basket: {
            item: body.item,
          },
          history: body.history,
        },
      }),
      invalidatesTags: [{ type: "Products" }],
    }),
    deleteItemFromSection: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products" }],
    }),
    changePrice: build.mutation<void, { price: string; id: string }>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "PATCH",
        body: {
          price: body.price,
        },
      }),
      invalidatesTags: [{ type: "Products" }],
    }),
    addNewItemInSection: build.mutation<void, IProduct>({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body: {
          id: body.id,
          category: body.category,
          frontImageUrl: body.frontImageUrl,
          backImageUrl: body.backImageUrl,
          title: body.title,
          price: body.price,
          color: body.color,
          description: body.description,
          size: body.size,
        },
      }),
      invalidatesTags: [{ type: "Products" }],
    }),
  }),
});
