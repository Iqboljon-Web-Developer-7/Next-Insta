// src/app/[locale]/layout.tsx

import Header from "@/components/header/Header";
import LocaleLayoutClient from "./LocaleLayoutClient";

// This component remains a Server Component
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
