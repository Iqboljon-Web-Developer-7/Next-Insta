"use client";

import PostItem from "@/components/home/postItem/PostItem";
import Stories from "@/components/home/stories/Stories";
import Users from "@/components/home/users/Users";

import { useGetFollowedPostsQuery, useGetPostsQuery } from "@/redux/api/Post";

import { postTypes } from "@/types/types";

// Shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const page = () => {
  const { data: posts } = useGetPostsQuery("");
  const { data: followedPosts } = useGetFollowedPostsQuery({ limit: 12 });

  const [isFollowedPosts, setIsFollowedPosts] = useState(false);

  const handlePostFilter = (event: string) => [
    event == "Following" ? setIsFollowedPosts(true) : setIsFollowedPosts(false),
  ];

  let postsResponse = posts?.map((post: postTypes, idx: number) => (
    <PostItem key={idx} post={post} />
  ));

  let followedPostsResponse = followedPosts?.posts.map(
    (post: postTypes, idx: number) => <PostItem key={idx} post={post} />
  );

  return (
    <main className="text-2xl w-full flex">
      <section className="flex-grow-[6] flex flex-col py-10 px-8">
        <Stories />
        <div className="filtering flex items-center justify-between my-10">
          <h2 className="text-3xl font-bold flex-grow-[4]">Home Feed</h2>
          <Select onValueChange={handlePostFilter}>
            <SelectTrigger className="flex-grow-[6] max-w-32">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Following">Following</SelectItem>
            </SelectContent>
          </Select>
          {1 ? "" : 1 == 1 ? "" : ""}
        </div>
        {posts && !isFollowedPosts ? (
          <div className="max-h-screen overflow-y-auto overflow-x-hidden">
            {postsResponse}
          </div>
        ) : isFollowedPosts ? (
          <div className="max-h-screen overflow-y-auto overflow-x-hidden">
            {followedPostsResponse}
          </div>
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
      </section>
      <Users />
    </main>
  );
};

export default page;
