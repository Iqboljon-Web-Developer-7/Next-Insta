// src/app/[locale]/layout.tsx

import Header from "@/components/header/Header";
import LocaleLayoutClient from "./LocaleLayoutClient";

import { unstable_setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// This component remains a Server Component
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  // Perform any async operations here if needed

  return (
    <>
      <LocaleLayoutClient>
        <Header />
      </LocaleLayoutClient>
      {children}
    </>
  );
}
