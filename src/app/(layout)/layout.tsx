"use client";
import React, { useEffect } from "react";

import Nav from "@/components/nav/Nav";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("insta-x-token")!);
    if (!value) {
      redirect("/auth/login");
    }
  }, []);
  return (
    <div className="flex">
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default layout;
