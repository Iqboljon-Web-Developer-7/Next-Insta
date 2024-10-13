import { ProfileForm } from "@/components/loginForm/Form";
import { Link } from "@/i18n/routing";
import React, { FC } from "react";

import { unstable_setRequestLocale } from "next-intl/server";

const page: FC<{ params: { locale: string } }> = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
      <div className="max-w-[400px] mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Log in to your account</h1>
          <p className="mb-6 text-[#7878A3] font-light">
            Welcome back! Please enter your details.
          </p>
        </div>
        <ProfileForm />
        <p className="mt-6 text-center">
          <span className="font-light"> Don't have an account? </span>
          <Link href={"/auth/register"}>
            <span className="text-purple-500 hover:underline font-medium">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
