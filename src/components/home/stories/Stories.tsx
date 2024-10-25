"use client";

import UserCarousel from "@/components/carousels/usersCarousel/usersCarousel";
import { useGetUsersQuery } from "@/redux/api/user";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import { useSelector } from "react-redux";

const Stories = () => {
  // const userInfo = useSelector((state: { user: {} }) => state.user);
  const { data } = useGetUsersQuery({});

  const OPTIONS: EmblaOptionsType = { align: "start" };

  return (
    <div className="storiesCarousel">
      <UserCarousel slides={data} options={OPTIONS} />
    </div>
  );
};

export default Stories;
