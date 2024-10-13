import React, { FC } from "react";

import { unstable_setRequestLocale } from "next-intl/server";

const About: FC<{ params: { locale: string } }> = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);

  return <div className="about">About</div>;
};

export default About;
