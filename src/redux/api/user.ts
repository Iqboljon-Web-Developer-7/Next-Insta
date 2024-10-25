import { api } from "./index";

import { UserTypes } from "@/types/types";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<UserTypes, { username?: string }>({
      query: ({ username = "" }) => ({
        url: `/user/profile${username}`,
      }),
      providesTags: ["User"],
    }),
    getUserPosts: build.query({
      query: ({ username = "" }) => ({
        url: `/post${username}`,
      }),
      providesTags: ["User"],
    }),
    getUsers: build.query<UserTypes[], { limit?: number }>({
      query: ({ limit = 8 }) => ({
        url: `/user/all?limit=${limit}`,
      }),
      providesTags: ["User"],
    }),
    followUser: build.mutation({
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
  useFollowUserMutation,
  useUnFollowUserMutation,
  useGetUserPostsQuery,
} = usersApi;
