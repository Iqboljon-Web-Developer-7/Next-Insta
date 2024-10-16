"use client";
import React, { useState } from "react";
import {
  useFollorUserMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useUnFollowUserMutation,
} from "@/redux/api/user-api";
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
    <div className="users max-h-screen overflow-hidden mr-9 flex-grow-[1]">
      <h2 className="text-white text-2xl p-[2.5rem_1.5rem] pb-0">
        Top Creators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[45rem] mt-[2rem] overflow-y-auto users__wrapper">
        {data?.map((creator: Creator, idx: number) => (
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
              className="w-14 h-14 rounded-full mb-4"
            />
            <h3 className="text-white text-base">{creator.username}</h3>
            <p className="text-gray-400 text-sm">
              {creator.emailActivated ? "Email Verified" : "Not Verified"}
            </p>

            {userData?._id &&
              (creator.followers.some((item) => item._id == userData._id) ? (
                <button
                  onClick={() => handleUnfollow(creator.username)}
                  className="mt-4 bg-red-300 text-white py-1 px-4 rounded-full text-sm"
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
                  className="mt-4 bg-purple-600 text-white py-1 px-4 rounded-full text-sm"
                  disabled={loadingUser === creator.username}
                >
                  {loadingUser === creator.username ? (
                    <div className="loader my-1 mx-3"></div>
                  ) : (
                    <span>Follow</span>
                  )}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
