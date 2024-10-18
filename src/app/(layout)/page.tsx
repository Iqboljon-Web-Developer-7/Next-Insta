"use client";

import Stories from "@/components/home/stories/Stories";
import Users from "@/components/home/users/Users";
import { useGetPostsQuery } from "@/redux/api/Post";

import PostItem from "@/components/home/postItem/PostItem";

const page = () => {
  const { data: posts } = useGetPostsQuery("");

  console.log(posts);

  let postsResponse = posts?.map((item: any, idx: number) => (
    <PostItem {...item} />
  ));

  return (
    <main className="text-2xl w-full flex">
      <section className="flex-grow-[6] flex flex-col">
        <Stories />
        Home Feed
        <div className="max-h-screen overflow-y-auto">{postsResponse}</div>
      </section>
      <Users />
    </main>
  );
};

export default page;
