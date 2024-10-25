"use client";

import React from "react";

import { useParams } from "next/navigation";
import { useGetPostCommentsQuery } from "@/redux/api/Post";

const singlePost = () => {
  const params = useParams();
  const { data: postComments } = useGetPostCommentsQuery({ id: params.id });

  console.log(postComments);
  return <div>singlePost id:{params.id}</div>;
};

export default singlePost;
