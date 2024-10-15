"use client";
import React from "react";
import Nav from "@/components/nav/Nav";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const authCheck = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth
  );

  if (!authCheck?.isAuthenticated) {
    redirect("/auth/login");
  }

  return (
    <div className="flex max-w-[100rem] mx-auto">
      <Nav />
      <h1>{authCheck?.isAuthenticated && "salommm"}</h1>
      <>{children}</>
    </div>
  );
};

export default Layout;
