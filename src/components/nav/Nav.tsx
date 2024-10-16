"use client";

import React, { useEffect, useState } from "react";

// Helper Components
import Link from "next/link";
import Image from "next/image";

// To know pathname
import { redirect, usePathname, useRouter } from "next/navigation";

// Images
import websiteLogo from "@/assets/logo/website__logo.svg";
import LogoImg from "@/assets/logo/favicon.png";

import HomeImg from "@/assets/nav/Home.svg";
import ExploreImg from "@/assets/nav/Gallery.svg";
import PeopleImg from "@/assets/nav/Users.svg";
import SaveImg from "@/assets/nav/Saved.svg";
import ReelsImg from "@/assets/nav/Reels.svg";
import ChatImg from "@/assets/nav/Chats.svg";
import CreatePostImg from "@/assets/nav/CreatePost.svg";
import LogoutImg from "@/assets/nav/Logout.svg";
import SettingsImg from "@/assets/nav/Settings.svg";

import IndicatorImg from "@/assets/nav/indicator.svg";

import "./styles.scss";
import { toast } from "react-toastify";
import { useGetUserProfileQuery } from "@/redux/api/user";

const links = [
  { href: "/", imgSrc: HomeImg.src, label: "Home" },
  { href: "/explore", imgSrc: ExploreImg.src, label: "Explore" },
  { href: "/people", imgSrc: PeopleImg.src, label: "People" },
  { href: "/saved", imgSrc: SaveImg.src, label: "Saved" },
  { href: "/reels", imgSrc: ReelsImg.src, label: "Reels" },
  { href: "/chats", imgSrc: ChatImg.src, label: "Chats" },
  { href: "/createPost", imgSrc: CreatePostImg.src, label: "Create Post" },
];

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isError } = useGetUserProfileQuery("");

  isError && redirect("/auth/login");

  const handleLogOut = () => {
    toast("Logged out", {
      autoClose: 1250,
      position: "bottom-right",
      theme: "dark",
    });
    localStorage.clear();
    router.push("/auth/login");
  };

  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    window.innerWidth < 1222 && setIsOpen(false);

    window.addEventListener("resize", (e) => {
      const target = e.target as Window;
      target.innerWidth < 1222 ? setIsOpen(false) : setIsOpen(true);
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div
      className={`navigation bg-black transition-all ${
        isOpen && "min-w-[17rem] w-[17rem]"
      } min-h-screen text-white flex flex-col justify-between border-e border-[#4f4f4f4f]`}
    >
      <div>
        <Image
          src={isOpen ? websiteLogo.src : LogoImg.src}
          alt="website logo"
          width={120}
          height={120}
          className={`pb-0 ${
            isOpen ? "w-52 p-[2.5rem_1.5rem]" : "w-10 m-4 mx-auto"
          }`}
          priority
        />
        <div
          className={`userProfile my-[2rem] px-4 flex gap-3 overflow-hidden relative ${
            isOpen && "custom-shadow"
          }`}
        >
          <img
            src={
              data?.photo ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            className="w-14 h-14 rounded-full flex-shrink-0"
            alt="user image"
          />
          <div className={`userProfile__info ${!isOpen && "hidden"} relative`}>
            <h2 className="font-semibold">{data?.username}</h2>
            <p className="text-[#7878A3] line-clamp-1">{data?.email}</p>
          </div>
        </div>
        <nav className="navigation__main flex items-start justify-center gap-2 flex-col">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`
              font-semibold w-full px-4 relative nav__link group`}
            >
              <img
                src={IndicatorImg.src}
                alt="indicator img"
                className={`absolute w-8 h-full -left-3 top-0 opacity-0 group-hover:opacity-100 ${
                  pathname === link.href ? "opacity-100" : ""
                } duration-300`}
              />
              <span
                className={`${
                  pathname === link.href ? "bg-[#877EFF]" : ""
                } hover:bg-[#877EFF] duration-300 w-full p-4 rounded-xl text-[1.125rem] flex gap-4`}
              >
                <Image
                  src={link.imgSrc}
                  alt={`nav ${link.label} img`}
                  width={0}
                  height={0}
                  className={`max-w-6 group-hover:invert group-hover:brightness-0 ${
                    pathname === link.href ? "brightness-0 invert" : ""
                  }`}
                />

                {isOpen && link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="subNav flex-center flex-col gap-2 py-2">
        <button
          onClick={() => handleLogOut()}
          className={`font-semibold w-full px-4 relative nav__link group`}
        >
          <span
            className={`hover:bg-[#ef3a3a] duration-300 w-full p-4 rounded-xl text-[1.125rem] flex gap-4`}
          >
            <Image
              src={LogoutImg.src}
              alt={`nav logout img`}
              width={0}
              height={0}
              className={`max-w-6 group-hover:invert group-hover:brightness-0 ${
                pathname === "/logout" ? "brightness-0 invert" : ""
              }`}
            />
            {isOpen && "Logout"}
          </span>
        </button>
        <Link
          href={"/settings"}
          className={`font-semibold w-full px-4 relative nav__link group`}
        >
          <span
            className={`${
              pathname == "/settings" && "bg-[#877EFF]"
            } hover:bg-[#877EFF] duration-300 p-4 rounded-xl text-[1.125rem] flex gap-4 px-4`}
          >
            <Image
              src={SettingsImg.src}
              alt={`nav logout img`}
              width={0}
              height={0}
              className={`max-w-6 group-hover:invert group-hover:brightness-0 ${
                pathname === "/settings" ? "brightness-0 invert" : ""
              }`}
            />
            {isOpen && "Settings"}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
