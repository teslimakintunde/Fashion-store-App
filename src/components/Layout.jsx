import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100">
      <Outlet />
    </div>
  );
};

export default Layout;
