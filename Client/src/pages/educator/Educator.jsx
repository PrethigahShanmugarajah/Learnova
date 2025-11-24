// Learnova / Client / src / pages / educator / Educator.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const Educator = () => {
  return (
    <div>
      <h1 className="text-green-500 bg-green-600">Educator</h1>
      <div>{<Outlet />}</div>
    </div>
  );
};

export default Educator;
