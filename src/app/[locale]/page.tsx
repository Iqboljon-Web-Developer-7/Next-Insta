"use client";

import React from "react";

import { redirect } from "@/i18n/routing";

const Home = () => {
  if (!JSON.parse(localStorage.getItem("insta-x-token")!)) {
    redirect("/auth/register");
  }

  return <div>Homee</div>;
};

export default Home;
