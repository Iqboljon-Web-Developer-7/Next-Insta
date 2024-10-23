import React, { ReactNode } from "react";

import img from "@/assets/register/register-img.png";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className=" bg-black text-slate-200">
      <div className="mx-auto flex min-h-screen">
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
