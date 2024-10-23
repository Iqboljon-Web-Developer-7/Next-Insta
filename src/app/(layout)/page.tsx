"use client";

import PostItem from "@/components/home/postItem/PostItem";
import Stories from "@/components/home/stories/Stories";
import Users from "@/components/home/users/Users";

import { useGetPostsQuery } from "@/redux/api/Post";

import { postTypes } from "@/types/types";

// Shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  const { data: posts } = useGetPostsQuery("");

  let postsResponse = posts?.map((post: postTypes, idx: number) => (
    <PostItem key={idx} post={post} />
  ));

  return (
    <main className="text-2xl w-full flex">
      <section className="flex-grow-[6] flex flex-col py-12 px-8">
        <Stories />
        <div className="filtering flex items-center justify-between my-10">
          <h2 className="text-3xl font-bold flex-grow-[4]">Home Feed</h2>
          <Select>
            <SelectTrigger className="flex-grow-[6] max-w-20">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="est">All</SelectItem>
              <SelectItem value="cst">1</SelectItem>
              <SelectItem value="mst">2</SelectItem>
              <SelectItem value="pst">3</SelectItem>
              <SelectItem value="akst">4</SelectItem>
              <SelectItem value="hst">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {posts ? (
            <div className="max-h-screen overflow-y-auto">{postsResponse}</div>
          ) : (
            new Array(3).fill(3).map((_, idx) => (
              <div key={idx} className="animate-pulse p-8">
                <div className="flex items-center gap-4 mb-1">
                  <div className="bg-slate-800 h-10 w-10 rounded-full"></div>
                  <div className="bg-slate-800 h-8 w-3/4 rounded"></div>
                </div>
                <div className="bg-slate-800 h-6 w-1/2 rounded my-4"></div>

                <div className="bg-slate-800 h-64 w-full rounded mb-4"></div>

                <div className="flex space-x-2">
                  <div className="bg-slate-800 h-8 w-9 rounded-full"></div>
                  <div className="bg-slate-800 h-8 w-9 rounded-full"></div>
                  <div className="bg-slate-800 h-8 w-9 rounded-full"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <Users />
    </main>
  );
};

export default page;
