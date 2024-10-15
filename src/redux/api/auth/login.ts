import { api } from "../index";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: ({ body }) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginUserMutation } = usersApi;
