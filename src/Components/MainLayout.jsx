import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <AppBar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 p-4 ${
            isSidebarOpen ? "ml-56" : "ml-0"
          } mt-14`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
