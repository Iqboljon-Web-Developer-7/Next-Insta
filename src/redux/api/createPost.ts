import { CreatePostTypes } from "@/types/types";
import { api } from "./index";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFiles: build.query({
      query: ({ files }) => ({
        url: `/upload/files`,
        method: "POST",
        body: files,
      }),
      //   providesTags: ["User"],
    }),
    createPost: build.query<"", CreatePostTypes>({
      query: ({ data }) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {} = usersApi;
