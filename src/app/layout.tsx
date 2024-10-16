"use client";

import localFont from "next/font/local";
import "./globals.scss";
import "@/scss/main.scss";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "@/redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>SnapGram</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-Inter bg-black text-slate-200`}
      >
        <Provider store={store}>{children}</Provider>
        <ToastContainer
          autoClose={1500}
          position={"bottom-right"}
          theme={"dark"}
        />
      </body>
    </html>
  );
}
