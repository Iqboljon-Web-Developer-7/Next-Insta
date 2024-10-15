"use client";

import { useGetUsersQuery } from "@/redux/api/user-api";
import { Creator } from "@/types/types";
import React from "react";

import "./styles.scss";

const Users: React.FC = () => {
  const { data } = useGetUsersQuery("");

  return (
    <div className="users max-h-screen overflow-hidden p-4 mr-9">
      <h2 className="text-white text-2xl p-[2.5rem_1.5rem]">Top Creators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[40rem] overflow-y-auto users__wrapper">
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
            <button className="mt-4 bg-purple-600 text-white py-1 px-4 rounded-full text-sm">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
