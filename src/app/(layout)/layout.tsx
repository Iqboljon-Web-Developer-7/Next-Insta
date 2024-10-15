"use client";
import React, { useEffect } from "react";

import Nav from "@/components/nav/Nav";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  (function () {
    const token = localStorage.getItem("insta-x-token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
      } catch (error) {
        console.error("Failed to decode the token:", error);
      }
    } else {
      redirect("/auth/login");
    }
  })();

  return (
    <div className="flex">
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default layout;
