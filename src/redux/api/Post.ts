import { CreatePostTypes } from "@/types/types";
import { api } from "./index";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSinglePost: build.query({
      query: ({ username, id }) => ({
        url: `/post/${username}/${id}`,
      }),
      providesTags: ["Posts"],
    }),
    getPosts: build.query({
      query: () => ({
        url: "/post",
      }),
      providesTags: ["Posts"],
    }),
    getFollowedPosts: build.query({
      query: ({ limit = 10 }) => ({
        url: `/user/feed?limit=${limit}`,
      }),
      providesTags: ["Posts"],
    }),
    uploadFiles: build.mutation({
      query: ({ files }) => ({
        url: `/upload/files`,
        method: "POST",
        body: files,
      }),
      invalidatesTags: ["Posts"],
    }),
    createPost: build.mutation<any, CreatePostTypes>({
      query: ({ data }) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    commentPost: build.mutation({
      query: ({ id, body }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    getPostComments: build.query({
      query: ({ id }) => ({
        url: `/comment/post/${id}`,
      }),
      providesTags: ["Posts"],
    }),
    likePost: build.mutation({
      query: ({ id }) => ({
        url: `/post/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useUploadFilesMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetFollowedPostsQuery,
  useCommentPostMutation,
  useGetPostCommentsQuery,
  useLikePostMutation,
} = usersApi;
