import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../hooks/firebase";
import { IdentifyResult, UserListFilter, UserListResult } from "./types";

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
  tagTypes: ["ACCOUNT"],
  endpoints: (builder) => ({
    getIdentity: builder.query<IdentifyResult, void>({
      query: () => `whoami`,
      providesTags: () => ["ACCOUNT"],
    }),
    getUserList: builder.query<UserListResult, UserListFilter>({
      query: (params) => ({
        url: `user/list`,
        params: { ...params },
      }),
      providesTags: () => ["ACCOUNT"],
    }),
    // getDashboardSummary: builder.query<
    //   SummaryResult,
    //   {
    //     params: { tahun: string };
    //   }
    // >({
    //   query: (params) => ({
    //     url: `dashboard/summary`,
    //     params: { ...params.params },
    //   }),
    //   providesTags: () => [{ type: "ACCOUNT" }, { type: "COMMISSION_PAID" }],
    // }),
    // getAgenList: builder.query<AgenListResult, AgenListFilter>({
    //   query: (params) => ({
    //     url: `user/list`,
    //     params: {
    //       ...params,
    //     },
    //   }),
    //   providesTags: () => ["ACCOUNT", "PROFILE", "AGEN_LIST"],
    // }),
    // getAgentCommissions: builder.query<
    //   AgentCommission,
    //   { params: { per_page: number; page: number } }
    // >({
    //   query: (data) => ({
    //     url: "commission",
    //     params: {
    //       ...data.params,
    //     },
    //   }),
    //   providesTags: () => ["COMMISSION_PAID"],
    // }),
    // getAgenProfile: builder.query<AgenProfileResult, string>({
    //   query: (uuid) => ({
    //     url: `user/show/${uuid}`,
    //   }),
    //   providesTags: () => ["ACCOUNT", "PROFILE"],
    // }),
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
    // updateAgenStatus: builder.mutation<EditAgenStatusResult, string>({
    //   query: (uuid) => ({
    //     url: `user/edit/${uuid}/status`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["PROFILE"],
    // }),
    // getAgenTransactionList: builder.query<
    //   AgenTransactionListResult,
    //   { uuid: string; params: { per_page: number; page: number } }
    // >({
    //   query: (data) => ({
    //     url: `user/table/transaction/${data.uuid}`,
    //     params: {
    //       ...data.params,
    //     },
    //   }),
    // }),
    // getOverallTransactionList: builder.query<
    //   OverallTransactionListResult,
    //   OverallTransactionListFilter
    // >({
    //   query: (data) => ({
    //     url: `dashboard/transaction/list`,
    //     params: {
    //       ...data,
    //     },
    //   }),
    // }),
    // getAdminDetail: builder.query<AdminDetailUser, { uuid: string }>({
    //   query: (param) => ({
    //     url: `user/admin/show/${param.uuid}`,
    //   }),
    // }),
    // createAgen: builder.mutation<
    //   AgenRegistrationResult,
    //   AgenRegistrationPayload
    // >({
    //   query: (data) => ({
    //     url: `user/create`,
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["AGEN_LIST"],
    // }),
    // createCommissionPaid: builder.mutation<
    //   CommssionPaidResult,
    //   CommssionPaidPayload
    // >({
    //   query: (data) => ({
    //     url: `commission/pay`,
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["COMMISSION_PAID"],
    // }),
    // getAgenCommissionList: builder.query<
    //   AgenCommissionList,
    //   { params: { per_page: number; page: number } }
    // >({
    //   query: (data) => ({
    //     url: `user/commission/paid`,
    //     params: {
    //       ...data.params,
    //     },
    //   }),
    // }),
    // getCommissionAllAgenList: builder.query<
    //   AllAgenCommission,
    //   { params: { per_page: number; page: number } }
    // >({
    //   query: (data) => ({
    //     url: `commission/list`,
    //     params: {
    //       ...data.params,
    //     },
    //   }),
    //   providesTags: () => ["COMMISSION_PAID"],
    // }),
    // getAgenUnpaidCommissionList: builder.query<
    //   AllAgenCommission,
    //   { params: { per_page: number; page: number } }
    // >({
    //   query: (data) => ({
    //     url: `user/commission/unpaid`,
    //     params: {
    //       ...data.params,
    //     },
    //   }),
    //   providesTags: () => ["COMMISSION_PAID"],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetIdentityQuery,
  useLazyGetIdentityQuery,
  useGetUserListQuery,
} = api;
