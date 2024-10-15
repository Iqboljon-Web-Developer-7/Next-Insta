"use client";
import React, { useEffect } from "react";
import Nav from "@/components/nav/Nav";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const isAuthenticated = useSelector(
  //   (state: { auth: { isAuthenticated: boolean } }) =>
  //     state.auth.isAuthenticated
  // );

  const authCheck = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("insta-x-token");
    if (!token || !authCheck?.isAuthenticated) {
      redirect("/auth/login");
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // You can handle the payload as needed here
      } catch (error) {
        console.error("Failed to decode the token:", error);
        redirect("/auth/login"); // Optionally redirect if there's an error
      }
    }
  }, []);

  return (
    <div className="flex">
      <Nav />
      <>{children}</>
    </div>
  );
};

export default Layout;
