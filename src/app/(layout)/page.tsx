"use client";
import React, { useEffect } from "react";

import { redirect } from "next/navigation";

const page = () => {
  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("insta-x-token")!);
    if (!value) {
      redirect("/auth/login");
    }
  }, []);

  return <main className="text-2xl">Home</main>;
};

export default page;
