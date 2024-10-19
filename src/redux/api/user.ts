import { api } from "./index";

import { UserTypes } from "@/types/types";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<UserTypes, "">({
      query: () => ({
        url: `/user/profile`,
      }),
      providesTags: ["User"],
    }),
    getUsers: build.query<UserTypes[], { limit?: number }>({
      query: ({ limit = 8 }) => ({
        url: `/user/all?limit=${limit}`,
      }),
      providesTags: ["User"],
    }),
    follorUser: build.mutation({
      query: ({ username }) => ({
        method: "POST",
        url: `user/follow/${username}`,
      }),
      invalidatesTags: ["User"],
    }),
    unFollowUser: build.mutation({
      query: ({ username }) => ({
        method: "POST",
        url: `user/unfollow/${username}`,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUsersQuery,
  useFollorUserMutation,
  useUnFollowUserMutation,
} = usersApi;
