"use client";
import "./styles.scss";
import React from "react";

import { useGetUsersQuery } from "@/redux/api/user";
import { UserTypes } from "@/types/types";

import User from "@/components/util/user/User";

const Users: React.FC = () => {
  const { data } = useGetUsersQuery({});

  return (
    <div className="users flex-shrink-0 min-h-screen max-h-screen max-w-[18rem] lg:max-w-[22rem] overflow-hidden px-2 lg:px-9 flex flex-col flex-grow-[1]">
      <h2 className="text-white text-2xl p-[2.5rem_1.5rem] pb-0 w-full">
        Top users
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 self-stretch mt-[2rem] overflow-y-auto overflow-x-hidden users__wrapper">
        {data
          ? data.map((user: UserTypes, idx: number) => (
              <User key={idx} user={user} />
            ))
          : new Array(8).fill(8).map((_, idx) => (
              <div
                key={idx}
                className="p-4 px-10 bg-black border border-gray-800 rounded-lg animate-pulse"
              >
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
