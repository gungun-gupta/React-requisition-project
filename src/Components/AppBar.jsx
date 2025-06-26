import React from "react";
import { FaBars } from "react-icons/fa";
import LoginService from "../services/login.service";
import { useNavigate } from "react-router-dom";

const AppBar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const user = LoginService.getUser();

  const handleLogout = () => {
    LoginService.logoutUser();
    navigate("/");
  };

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 h-14 shadow-md border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left: Sidebar toggle + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-gray-100"
        >
          <FaBars className="text-lg text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Inventory Management System
        </h1>
      </div>

      {/* Right: Welcome + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, <span className="font-medium">{user || "User"}</span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default AppBar;
