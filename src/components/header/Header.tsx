import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Header = () => {
  const t = useTranslations("Header");

  return (
    <header className="p-4 flex items-center justify-center gap-3">
      <Link href={"/"}>{t("home")}</Link>
      <Link href={"/about"}>{t("about")}</Link>
      <Link href={"/login"}>{t("login")}</Link>
    </header>
  );
};

export default Header;
