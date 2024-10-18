import { CreatePostTypes } from "@/types/types";
import { api } from "./index";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFiles: build.mutation({
      query: ({ files }) => ({
        url: `/upload/files`,
        method: "POST",
        body: files,
      }),
      //   providesTags: ["User"],
    }),
    createPost: build.mutation<any, CreatePostTypes>({
      query: ({ data }) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFilesMutation, useCreatePostMutation } = usersApi;
