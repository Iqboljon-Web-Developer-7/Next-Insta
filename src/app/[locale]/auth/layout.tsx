import React, { ReactNode } from "react";

import img from "@/assets/register/register-img.png";

import { unstable_setRequestLocale } from "next-intl/server";

const layout = ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  unstable_setRequestLocale(locale);

  return (
    <div className=" bg-black text-white">
      <div className="mx-auto max-w-screen-2xl flex min-h-screen">
        {children}
        <div
          className="hidden md:flex w-1/2 bg-gray-900 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${img.src})` }}
        ></div>
      </div>
    </div>
  );
};

export default layout;
