"use client";

import React, { FC } from "react";

import { redirect } from "@/i18n/routing";

const Home: FC<{ params: { locale: string } }> = ({ params: { locale } }) => {
  try {
    const token = localStorage.getItem("insta-x-token");
    if (!token || !JSON.parse(token)) {
      redirect("/auth/register");
    }
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
    redirect("/auth/register"); // Handle the error appropriately
  }

  return <>Homee</>;
};

export default Home;
