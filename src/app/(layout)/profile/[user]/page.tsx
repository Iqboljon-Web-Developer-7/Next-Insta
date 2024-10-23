"use client";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  useFollorUserMutation,
  useGetUserPostsQuery,
  useGetUserProfileQuery,
  useUnFollowUserMutation,
} from "@/redux/api/user";

import notFoundPost from "@/assets/people/not found posts.webp";
import Image from "next/image";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { useSelector } from "react-redux";

const page = () => {
  const [loadingUser, setLoadingUser] = useState<string | null>(null);

  const [follorUser] = useFollorUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();

  const handleFollow = async (username: string) => {
    setLoadingUser(username);
    try {
      await follorUser({ username });
    } finally {
      setLoadingUser(null);
    }
  };

  const handleUnfollow = async (username: string) => {
    setLoadingUser(username);
    try {
      await unfollowUser({ username });
    } finally {
      setLoadingUser(null);
    }
  };

  const [username, setUsername] = useState("");
  const { data } = useGetUserProfileQuery({ username });
  const { data: userPosts } = useGetUserPostsQuery({ username });
  const params = useParams();

  const userData = useSelector(
    (state: { user: { _id: string } }) => state.user
  );

  useEffect(() => {
    setUsername(`/${params.user}`);
  }, [params]);

  return (
    <div className="px-8">
      <div className="p-5 flex justify-center mt-12">
        <img
          src={data?.photo!}
          className="w-36 h-36 rounded-full mr-[1.875rem]"
          alt="profile photo"
        />
        <div className="flex flex-col gap-3">
          <div className="user-title flex items-center justify-between">
            <h2 className="text-4xl font-semibold capitalize ">
              {data?.fullName}
            </h2>
            <div className="subscription ml-10 flex gap-3 items-center justify-center">
              {data?.followers.some((item) => item._id == userData?._id) ? (
                <button
                  onClick={() => handleUnfollow(data?.username)}
                  className="bg-red-300 text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
                  disabled={loadingUser === data?.username}
                >
                  {loadingUser === data?.username ? (
                    <div className="loader my-1 mx-3"></div>
                  ) : (
                    <span>Unfollow</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(data?.username!)}
                  className="bg-[#877EFF] text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
                  disabled={loadingUser === data?.username}
                >
                  {loadingUser === data?.username ? (
                    <div className="loader my-1 mx-3"></div>
                  ) : (
                    <span>Follow</span>
                  )}
                </button>
              )}
            </div>
            <button className="bg-slate-200 text-slate-900 ml-3 py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm">
              Message
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[#7878A3] text-xl">@{data?.username}</p>
            <div className="flex items-center justify-start gap-5 text-xl">
              <h3>
                <span className="text-[#877EFF]">{data?.posts.length}</span>{" "}
                Posts
              </h3>
              <h3>
                <span className="text-[#877EFF]">{data?.followers.length}</span>{" "}
                Followers
              </h3>
              <h3>
                <span className="text-[#877EFF]">{data?.following.length}</span>{" "}
                Following
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div>
        {data?.posts.length == 0 ? (
          <Image
            src={notFoundPost.src}
            alt="not found img"
            height={1000}
            width={1000}
            className="max-w-96 mx-auto"
          />
        ) : (
          <div className="grid grid-cols-4">
            {userPosts?.map((item: any) => (
              <div>
                {" "}
                <Zoom>
                  <Image
                    src={item.content[0].url}
                    alt="img of post"
                    height={1000}
                    width={1000}
                  />
                </Zoom>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
