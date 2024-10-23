"use client";

import React, { useState } from "react";

import { UserTypes } from "@/types/types";
import {
  useFollorUserMutation,
  useUnFollowUserMutation,
} from "@/redux/api/user";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface UserHelperType {
  user: UserTypes;
  h3ClasStyles?: string;
}

const User = ({ user, h3ClasStyles }: UserHelperType) => {
  const [loadingUser, setLoadingUser] = useState<string | null>(null);

  const fallbackImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = fallbackImage; // Set the fallback image
  };

  const router = useRouter();
  const userData = useSelector(
    (state: { user: { userInfo: { _id: string } } }) => state.user.userInfo
  );

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
  return (
    <div
      key={user._id}
      onClick={() => router.push(`/profile/${user.username}`)}
      className="w-full max-w-[18.75rem] min-w-32 mx-auto p-4 py-8 flex flex-col items-center text-center"
    >
      <img
        src={
          user.photo ||
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        }
        onError={handleImageError}
        alt={user.fullName}
        className="w-10 h-10 lg:w-14 lg:h-14 rounded-full mb-4"
      />
      <h3 className={`text-white text-sm lg:text-base ${h3ClasStyles}`}>
        {user.username}
      </h3>
      <p className="text-gray-400 text-[.75rem] lg:text-sm leading-5 lg:leading-normal">
        {user.emailActivated ? "Email Verified" : "Not Verified"}
      </p>

      {user.followers.some((item) => item._id == userData?._id) ? (
        <button
          onClick={() => handleUnfollow(user.username)}
          className="mt-2 lg:mt-4 bg-red-300 text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
          disabled={loadingUser === user.username}
        >
          {loadingUser === user.username ? (
            <div className="loader my-1 mx-3"></div>
          ) : (
            <span>Unfollow</span>
          )}
        </button>
      ) : (
        <button
          onClick={() => handleFollow(user.username)}
          className="mt-2 lg:mt-4 bg-[#877EFF] text-white py-[1px] leading-6 lg:leading-normal lg:py-1 px-4 rounded-md text-[.75rem] lg:text-sm"
          disabled={loadingUser === user.username}
        >
          {loadingUser === user.username ? (
            <div className="loader my-1 mx-3"></div>
          ) : (
            <span>Follow</span>
          )}
        </button>
      )}
    </div>
  );
};

export default User;
