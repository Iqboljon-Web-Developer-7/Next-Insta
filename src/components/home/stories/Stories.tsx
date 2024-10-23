"use client";

import UserCarousel from "@/components/carousels/usersCarousel/usersCarousel";
import { useGetUsersQuery } from "@/redux/api/user";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import { useSelector } from "react-redux";

const Stories = () => {
  const userInfo = useSelector((state: { user: {} }) => state.user);
  const { data } = useGetUsersQuery({});

  console.log(userInfo);
  console.log(data);

  const OPTIONS: EmblaOptionsType = { align: "start" };

  return (
    <div className="w-full">
      <UserCarousel slides={data} options={OPTIONS} />
    </div>
  );
};

export default Stories;
