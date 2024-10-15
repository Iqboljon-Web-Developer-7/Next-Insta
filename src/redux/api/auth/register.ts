import { api } from "../index";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: ({ body }) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useRegisterUserMutation } = usersApi;
