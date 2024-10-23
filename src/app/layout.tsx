"use client";

import "./globals.scss";
import "@/scss/main.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "@/redux";

import { Toaster } from "@/components/ui/toaster";

import { Suspense } from "react";

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
        className={`antialiased font-Inter bg-black text-slate-200 overflow-hidden`}
      >
        <Suspense
          fallback={
            <p className="text-center p-8 text-slate-200">
              Website is loading. Please wait....
            </p>
          }
        >
          <Provider store={store}>{children}</Provider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
