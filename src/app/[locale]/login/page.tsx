"use client";
import React, { FC } from "react";

import { unstable_setRequestLocale } from "next-intl/server";

const page: FC<{ params: { locale: string } }> = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
        suscipit quasi inventore nisi corporis vitae beatae placeat rerum
        eveniet velit? Ducimus omnis ipsam earum provident obcaecati ad porro
        repellendus magnam!
      </h1>
    </>
  );
};

export default page;
