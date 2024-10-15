import { api } from "./index";

interface User {
  id: number;
  name: string;
  email: string;
}

// Define the parameters for fetching a user (if any)
interface GetUserParams {
  token: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<User, GetUserParams>({
      query: ({ token }) => ({
        url: `/user/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery } = usersApi;
