// import { api } from "./index";

// export const articlesApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     getBlogs: build.query({
//       query: ({ limit }) => ({
//         url: "/67062fc7ad19ca34f8b5558a",
//         headers: {
//           "X-JSON-Path": `$..blogs[:${limit}]`,
//         },
//       }),
//       providesTags: ["Articles"],
//     }),
//     getBlog: build.query({
//       query: ({ id }) => ({
//         url: "/67062fc7ad19ca34f8b5558a",
//         headers: {
//           "X-JSON-Path": `$..blogs[?(@.id == ${id})]`,
//         },
//       }),
//       providesTags: ["Articles"],
//     }),
//   }),
// });
// export const { useGetBlogQuery, useGetBlogsQuery } = articlesApi;
