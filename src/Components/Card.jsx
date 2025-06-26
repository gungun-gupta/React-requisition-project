import React, { useState } from "react";
import { FaFilter, FaPlus, FaUndo } from "react-icons/fa";

const Card = ({ onAdd, onFilter }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const resetFilters = () => {
    setFromDate("");
    setToDate("");
    if (onFilter) onFilter("", "");
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white shadow-xl border border-gray-200 rounded-xl p-6 my-6 mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Purchase Requisition(s)
          </h2>
          <p className="text-sm text-slate-500">
            View, filter, or add new requisitions.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md text-sm font-medium transition-all"
        >
          <FaPlus /> Add Requisition
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 mt-6 sm:mt-0 items-end">
          <button
            onClick={onFilter}
            className="flex-1 inline-flex items-center gap-2 justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition"
          >
            <FaFilter /> Apply Filter
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 inline-flex items-center gap-2 justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium shadow transition"
          >
            <FaUndo /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
