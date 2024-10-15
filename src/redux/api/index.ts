import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";
// import { logout } from '../slices/authSlice';

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://sea-turtle-app-c2icp.ondigitalocean.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("insta-x-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      console.error(
        "Unauthorized access - Redirecting to login...vaaaaaaaaaaaa"
      );
    }
  }
  return result;
};
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "myApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["User"], // o'zgaradi
  endpoints: () => ({}),
});
