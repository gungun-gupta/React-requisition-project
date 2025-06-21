import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AppBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-blue-600 text-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-800 px-3 py-1 rounded"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">Purchase Requisition</h1>
        </div>
        <div>
          <span className="text-sm">Welcome, User</span>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default AppBar;
