"use client";

import { usePathname } from "@/i18n/routing";

export default function LocaleLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.split("/").includes("auth")) {
    return;
  }
  return <>{children}</>;
}