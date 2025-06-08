import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
      <DashFooter />
    </>
  );
};

export default DashLayout;
