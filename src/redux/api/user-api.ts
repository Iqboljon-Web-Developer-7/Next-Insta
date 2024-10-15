import { api } from "./index";

import { Creator } from "@/types/types";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<Creator, "">({
      query: () => ({
        url: `/user/profile`,
      }),
      providesTags: ["User"],
    }),
    getUsers: build.query<Creator[], "">({
      query: () => ({
        url: `/user/all`,
      }),
      providesTags: ["User"],
    }),
    follorUser: build.mutation({
      query: ({ username }) => ({
        url: `user/follow/${username}`,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery, useGetUsersQuery } = usersApi;
