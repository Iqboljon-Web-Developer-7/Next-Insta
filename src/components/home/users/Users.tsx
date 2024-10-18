"use client";
import React, { useState } from "react";
import {
  useFollorUserMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useUnFollowUserMutation,
} from "@/redux/api/user";
import { Creator } from "@/types/types";

import "./styles.scss";

const Users: React.FC = () => {
  const { data: userData } = useGetUserProfileQuery("");
  const { data } = useGetUsersQuery("");
  const [follorUser] = useFollorUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();

  // State to keep track of the loading user
  const [loadingUser, setLoadingUser] = useState<string | null>(null);

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

  return (
    <div className="users flex-shrink-0 min-h-screen max-h-screen max-w-[19rem] lg:max-w-[28rem] overflow-hidden px-2 lg:px-9 flex flex-col flex-grow-[1]">
      <h2 className="text-white text-2xl p-[2.5rem_1.5rem] pb-0 w-full">
        Top Creators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 self-stretch mt-[2rem] overflow-y-auto users__wrapper">
        {data
          ? data?.map((creator: Creator, idx: number) => (
              <div
                key={creator._id || idx}
                className="w-full rounded-lg p-4 flex flex-col items-center text-center max-w-[400px] mx-auto border border-slate-800"
              >
                <img
                  src={
                    creator.photo ||
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  }
                  alt={creator.fullName}
                  className="w-10 h-10 lg:w-14 lg:h-14 rounded-full mb-4"
                />
                <h3 className="text-white text-sm lg:text-base">
                  {creator.username}
                </h3>
                <p className="text-gray-400 text-[.75rem] lg:text-sm leading-5 lg:leading-normal">
                  {creator.emailActivated ? "Email Verified" : "Not Verified"}
                </p>

                {creator.followers.some((item) => item._id == userData?._id) ? (
                  <button
                    onClick={() => handleUnfollow(creator.username)}
                    className="mt-2 lg:mt-4 bg-red-300 text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
                    disabled={loadingUser === creator.username}
                  >
                    {loadingUser === creator.username ? (
                      <div className="loader my-1 mx-3"></div>
                    ) : (
                      <span>Unfollow</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(creator.username)}
                    className="mt-2 lg:mt-4 bg-[#877EFF] text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
                    disabled={loadingUser === creator.username}
                  >
                    {loadingUser === creator.username ? (
                      <div className="loader my-1 mx-3"></div>
                    ) : (
                      <span>Follow</span>
                    )}
                  </button>
                )}
              </div>
            ))
          : new Array(8).fill(8).map((_, idx) => (
              <div className="p-4 px-10 bg-black border border-gray-800 rounded-lg animate-pulse">
                <div className="h-12 w-14 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-8 bg-gray-700 rounded w-full"></div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Users;
