"use client";

import PostItem from "@/components/home/postItem/PostItem";
import Stories from "@/components/home/stories/Stories";
import Users from "@/components/home/users/Users";
import { useGetPostsQuery } from "@/redux/api/Post";
import { PostProps } from "@/types/types";

const page = () => {
  const { data: posts } = useGetPostsQuery("");

  let postsResponse = posts?.map((item: PostProps, idx: number) => (
    <PostItem key={idx} {...item} />
  ));

  return (
    <main className="text-2xl w-full flex">
      <section className="flex-grow-[6] flex flex-col">
        <Stories />
        Home Feed
        <div className="max-h-screen overflow-y-auto p-5">{postsResponse}</div>
      </section>
      <Users />
    </main>
  );
};

export default page;
