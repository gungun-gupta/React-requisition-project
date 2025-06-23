import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const navigate= useNavigate();


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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

        <li>
          <div
            onClick={toggleDropdown}
            className="flex items-center justify-between hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Masters
            <svg
              className="w-2.5 h-2.5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>

          {isDropdownOpen && (
            <div className="bg-gray-700 mt-1 rounded shadow-sm">
              <ul className="py-2 text-sm text-white">
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={()=>navigate("/supplier")}>
                  Supplier 
                </li>
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  Customer
                </li>
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  Item Master
                </li>
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  Config
                </li>
              </ul>
            </div>
          )}
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
