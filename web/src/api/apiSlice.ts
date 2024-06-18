import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../hooks/firebase";
import {
  CreateUserResponse,
  IdentifyResponse,
  RoleListResponse,
  UserDetailResponse,
  UserListFilter,
  UserListResponse,
} from "./types";

export interface AgenListFilter {
  per_page: number;
  page: number;
  q: string;
}

export interface OverallTransactionListFilter {
  per_page: number;
  page: number;
  start_date: string;
  end_date: string;
  fpx_status: boolean;
}

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: async (headers) => {
      const user = auth.currentUser;
      if (user) {
        try {
          const token = await user.getIdToken(true);
          headers.set("authorization", `Bearer ${token}`);
        } catch (e) {
          console.error(e);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["USER_LIST"],
  endpoints: (builder) => ({
    // GET
    getIdentity: builder.query<IdentifyResponse, void>({
      query: () => `whoami`,
      // providesTags: () => ["ACCOUNT"],
    }),
    getUserList: builder.query<UserListResponse, UserListFilter>({
      query: (params) => ({
        url: `user/list`,
        params: { ...params },
      }),
      providesTags: () => ["USER_LIST"],
    }),
    getRoleList: builder.query<RoleListResponse, void>({
      query: () => `role/list`,
    }),
    getUserDetail: builder.query<UserDetailResponse, string>({
      query: (uuid) => `user/${uuid}/detail`,
      // providesTags
    }),

    // POST
    createUser: builder.mutation<CreateUserResponse, FormData>({
      query: (data) => ({
        url: `user/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, error) => {
        if (error) {
          return [];
        }
        return ["USER_LIST"];
      },
    }),
    // updateAgenProfile: builder.mutation<
    //   EditAgenProfileResult,
    //   { uuid: string; payload: EditAgenProfilePayload }
    // >({
    //   query: (data) => ({
    //     url: `user/edit/${data.uuid}/profile`,
    //     method: "POST",
    //     body: data.payload,
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["PROFILE"],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // GET
  useGetIdentityQuery,
  useLazyGetIdentityQuery,
  useGetUserListQuery,
  useGetRoleListQuery,
  useGetUserDetailQuery,

  // POST
  useCreateUserMutation,
} = api;
