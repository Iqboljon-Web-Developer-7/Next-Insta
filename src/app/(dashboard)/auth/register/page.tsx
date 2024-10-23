import { ProfileForm } from "@/components/auth/registerForm/Form";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
      <div className="max-w-[400px] mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Create a new account</h1>
          <p className="mb-6 text-[#7878A3] font-light">
            To use Snapgram, please enter your details.
          </p>
        </div>
        <ProfileForm />
        <p className="mt-6 text-center">
          <span className="font-light"> Have an account? </span>
          <Link href={"/auth/login"}>
            <span className="text-[#877EFF] hover:underline font-semibold">
              Log in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
