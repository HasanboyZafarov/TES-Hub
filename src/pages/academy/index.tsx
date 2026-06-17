import React from "react";
import { Outlet } from "react-router-dom";

const Academy = () => {
  return (
    <div>
      <h1>Academy</h1>
      <Outlet />
    </div>
  );
};

export default Academy;
