"use client";

import PostItem from "@/components/home/postItem/PostItem";
import Stories from "@/components/home/stories/Stories";
import Users from "@/components/home/users/Users";
import { useGetPostsQuery } from "@/redux/api/Post";
import { PostProps, postTypes } from "@/types/types";

const page = () => {
  const { data: posts } = useGetPostsQuery("");

  console.log(posts);

  let postsResponse = posts?.map((post: postTypes, idx: number) => (
    <PostItem key={idx} post={post} />
  ));

  return (
    <main className="text-2xl w-full flex">
      <section className="flex-grow-[6] flex flex-col">
        <Stories />
        Home Feed
        {posts ? (
          <div className="max-h-screen overflow-y-auto p-5">
            {postsResponse}
          </div>
        ) : (
          new Array(3).fill(3).map((item, idx) => (
            <div className="animate-pulse p-8">
              <div className="flex items-center gap-4 mb-1">
                <div className="bg-slate-800 h-10 w-10 rounded-full"></div>
                <div className="bg-slate-800 h-8 w-3/4 rounded"></div>
              </div>
              <div className="bg-slate-800 h-6 w-1/2 rounded my-4"></div>

              {/* Image skeleton */}
              <div className="bg-slate-800 h-64 w-full rounded mb-4"></div>

              <div className="flex space-x-2">
                <div className="bg-slate-800 h-8 w-9 rounded-full"></div>
                <div className="bg-slate-800 h-8 w-9 rounded-full"></div>
                <div className="bg-slate-800 h-8 w-9 rounded-full"></div>
              </div>
            </div>
          ))
        )}
      </section>
      <Users />
    </main>
  );
};

export default page;
