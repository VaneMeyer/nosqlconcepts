import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import MenuBar from "./dashboard/menubar";
import "./dashboard/dashboard-style.css"
function Main() {
  return (
    <div>
      <div>
        <MenuBar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
export default Main;
