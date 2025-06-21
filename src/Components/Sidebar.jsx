import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="p-4 text-lg font-semibold">Menu</div>
      <ul className="p-4 space-y-2">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          Dashboard
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          Requisitions
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          Settings
        </li>
      </ul>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-red-500 px-2 py-1 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default Sidebar;
