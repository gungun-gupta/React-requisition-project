import React, { useState, useEffect } from "react";
import {
  FaBoxes,
  FaCubes,
  FaMoneyBillWave,
  FaLayerGroup,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MaterialHeader = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const [mainGroup, setMainGroup] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Dashboard Summary State (mocked or fetched later)
  const [summary, setSummary] = useState({
    totalMaterials: 20,
    totalQty: 1580,
    totalValue: 245600,
    totalCategories: 4,
  });

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-200 mb-8">
      {/*Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Total Materials",
            value: summary.totalMaterials,
            icon: <FaBoxes className="text-white text-xl" />,
            color: "bg-blue-500",
          },
          {
            title: "Total Quantity",
            value: summary.totalQty,
            icon: <FaCubes className="text-white text-xl" />,
            color: "bg-green-500",
          },
          {
            title: "Stock Value",
            value: `₹ ${summary.totalValue}`,
            icon: <FaMoneyBillWave className="text-white text-xl" />,
            color: "bg-yellow-500",
          },
          {
            title: "Categories",
            value: summary.totalCategories,
            icon: <FaLayerGroup className="text-white text-xl" />,
            color: "bg-purple-500",
          },
        ].map((card, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-2xl shadow-lg ${card.color} text-white hover:scale-[1.02] transition`}
          >
            <div className="p-3 bg-white/20 rounded-full mr-4">{card.icon}</div>
            <div>
              <h4 className="text-sm font-medium opacity-90">{card.title}</h4>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Title + Add Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          Material / Service(s)
        </h2>
        <button
          onClick={() => navigate("/material/add")}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-5 py-2.5 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          <FaPlus />
          <span className="font-semibold">Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Main Group Dropdown */}
        <div className="w-full sm:w-52">
          <label className="block text-sm text-gray-600 mb-1">Main Group</label>
          <select
            value={mainGroup}
            onChange={(e) => setMainGroup(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-inner"
          >
            <option value="">Select Main Group</option>
            <option value="Raw Material">Raw Material</option>
            <option value="Semi Finished">Semi Finished</option>
            <option value="Finished">Finished</option>
            <option value="Consumables">Consumables</option>
          </select>
        </div>

        {/* From Date */}
        <div className="w-full sm:w-40">
          <label className="block text-sm text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />
        </div>

        {/* To Date */}
        <div className="w-full sm:w-40">
          <label className="block text-sm text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />
        </div>

        {/* Search Box */}
        <div className="flex-grow min-w-[100px]">
          <label className="block text-sm text-gray-600 mb-1">Search</label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 shadow-inner focus-within:ring-2 focus-within:ring-blue-500">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Quick search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialHeader;
