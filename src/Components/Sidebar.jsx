import React, { useState } from "react";
import {
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineCube,
  HiOutlineBuildingStorefront,
  HiOutlineClipboardDocument,
  HiOutlineHome,
} from "react-icons/hi2";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import LoginService from "../services/login.service";

const Sidebar = ({ isOpen }) => {
  const [showProcurement, setShowProcurement] = useState(false);
  const [showMasters, setShowMasters] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    LoginService.logoutUser();
    navigate("/");
  };

  const linkStyle =
    "flex items-center gap-2 hover:text-white cursor-pointer transition";
  const activeLink = "text-white font-semibold";

  return (
    <div
      className={`fixed top-14 left-0 h-[calc(100%-3.5rem)] w-56 bg-gray-900 text-gray-200 shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-40`}
    >
      <ul className="divide-y divide-gray-800 text-sm font-medium h-full flex flex-col justify-between">
        <div>
          {/* Dashboard */}
          <li className="px-4 py-3 hover:bg-gray-800">
            <NavLink to="/dashboard" className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeLink : "text-gray-400"}`
            }>
              <HiOutlineHome className="text-lg" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Masters Dropdown */}
          <li>
            <div
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer"
              onClick={() => setShowMasters(!showMasters)}
            >
              <div className="flex items-center gap-3">
                <HiOutlineClipboardDocument className="text-lg" />
                <span>Masters</span>
              </div>
              {showMasters ? <LuChevronUp /> : <LuChevronDown />}
            </div>

            {showMasters && (
              <ul className="pl-10 pr-4 pb-2 pt-1 space-y-2 text-sm text-gray-400">
                <li>
                  <NavLink
                    to="/supplier"
                    className={({ isActive }) =>
                      `${linkStyle} ${isActive ? activeLink : ""}`
                    }
                  >
                    <HiOutlineDocumentText className="text-base" />
                    <span>Supplier</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/customer"
                    className={({ isActive }) =>
                      `${linkStyle} ${isActive ? activeLink : ""}`
                    }
                  >
                    <HiOutlineCube className="text-base" />
                    <span>Customer</span>
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to="/MaterialMaster"
                    className={({ isActive }) =>
                      `${linkStyle} ${isActive ? activeLink : ""}`
                    }
                  >
                    <HiOutlineCube className="text-base" />
                    <span>Material Master</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Procurement Dropdown */}
          <li>
            <div
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer"
              onClick={() => setShowProcurement(!showProcurement)}
            >
              <div className="flex items-center gap-3">
                <HiOutlineClipboardDocument className="text-lg" />
                <span>Procurement</span>
              </div>
              {showProcurement ? <LuChevronUp /> : <LuChevronDown />}
            </div>

            {showProcurement && (
              <ul className="pl-10 pr-4 pb-2 pt-1 space-y-2 text-sm text-gray-400">
                <li>
                  <NavLink
                    to="/requisition"
                    className={({ isActive }) =>
                      `${linkStyle} ${isActive ? activeLink : ""}`
                    }
                  >
                    <HiOutlineDocumentText className="text-base" />
                    <span>Purchase Requisition</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/po"
                    className={({ isActive }) =>
                      `${linkStyle} ${isActive ? activeLink : ""}`
                    }
                  >
                    <HiOutlineCube className="text-base" />
                    <span>Purchase Order</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/grn"
                    className={({ isActive }) =>
                      `${linkStyle} ${isActive ? activeLink : ""}`
                    }
                  >
                    <HiOutlineBuildingStorefront className="text-base" />
                    <span>GRN</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Settings */}
          <li className="px-4 py-3 hover:bg-gray-800">
            <NavLink to="/settings" className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeLink : "text-gray-400"}`
            }>
              <HiOutlineCog className="text-lg" />
              <span>Settings</span>
            </NavLink>
          </li>
        </div>

        {/* 🔒 Logout Button at Bottom */}
        <li className="px-4 py-3 border-t border-gray-800 hover:bg-red-700 text-sm text-gray-300 hover:text-white cursor-pointer" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
