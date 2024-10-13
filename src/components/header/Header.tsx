import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="p-4 flex items-center justify-center gap-3">
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/auth/login"}>Login</Link>
    </header>
  );
};

export default Header;
