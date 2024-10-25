"use client";

import React from "react";

import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/compat/router";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  //   const { postId, username } = router.query;
  //   console.log("params:", router);
  console.log(router);

  return <div>page</div>;
};

export default page;
