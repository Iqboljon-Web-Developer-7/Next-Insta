import React from "react";
import Nav from "@/components/nav/Nav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default layout;
