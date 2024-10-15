import { api } from "./index";

interface User {
  id: number;
  name: string;
  email: string;
}

// Define the parameters for fetching a user (if any)
interface GetUserParams {
  id: number;
}

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<User, GetUserParams>({
      query: ({ id }) => ({
        url: `/user/profile`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery } = usersApi;
