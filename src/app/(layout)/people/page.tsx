"use client";

import React, { useState } from "react";

import usersImg from "@/assets/people/people.svg";
import Image from "next/image";
import { useGetUsersQuery } from "@/redux/api/user";
import EmblaCarousel from "@/components/carousels/infiniteCarousel/InfiniteScroll";
import { EmblaOptionsType } from "embla-carousel";

const page = () => {
  const [limit, setLimit] = useState(12);
  const { data: Users, refetch } = useGetUsersQuery({ limit });

  const OPTIONS: EmblaOptionsType = { dragFree: true };

  return (
    <div className="w-full max-h-screen flex flex-col">
      <div className="users__info flex items-center gap-4 font-semibold text-4xl mt-14 mx-10">
        <Image
          src={usersImg.src}
          className="max-w-8"
          alt="users icon"
          width={40}
          height={40}
        />
        All Users
      </div>
      <EmblaCarousel
        options={OPTIONS}
        slides={Users!}
        refetch={refetch}
        setLimit={setLimit}
      />
    </div>
  );
};

export default page;
