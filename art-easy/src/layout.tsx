import React from "react";
import { Outlet } from "react-router-dom";

export const LayoutPage = () => {
  return (
    <div>
      <header>LayoutPage</header>
      <Outlet />
    </div>
  );
};
