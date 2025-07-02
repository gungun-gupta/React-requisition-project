import React, { useState } from "react";
import {
  FaFilter,
  FaPlus,
  FaUndo,
  FaBoxes,
  FaCubes,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaHourglassHalf,
  FaTimesCircle,
  FaBuilding,
  FaBoxOpen,
} from "react-icons/fa";

const Card = ({ onAdd, onFilter }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const resetFilters = () => {
    setFromDate("");
    setToDate("");
    if (onFilter) onFilter("", "");
  };

  // Dashboard Summary State (mocked or fetched later)
  const [summary, setSummary] = useState({
    totalRequisitions: 12, // Total number of requisition entries
    totalRequestedQty: 860, // Sum of all quantities requested
    totalApprovedRequisitions: 9, // Approved requisition count
    totalPendingRequisitions: 3, // Pending or under approval
    totalRejectedRequisitions: 0, // Rejected requisitions
    totalRequisitionValue: 145300, // Sum of estimated costs/value of all requisitions
    totalDepartments: 3, // Unique departments requesting materials
    topRequestedMaterial: "Steel Rod", // Most frequently requested material
  });

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-200 mb-8">
      {/*Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Total Requisitions",
            value: summary.totalRequisitions,
            icon: <FaBoxes className="text-white text-xl" />,
            color: "bg-blue-500",
          },
          {
            title: "Total Requested Quantity",
            value: summary.totalRequestedQty,
            icon: <FaCubes className="text-white text-xl" />,
            color: "bg-green-500",
          },
          {
            title: "Total Requisition Value",
            value: `₹ ${summary.totalRequisitionValue}`,
            icon: <FaMoneyBillWave className="text-white text-xl" />,
            color: "bg-yellow-500",
          },
          {
            title: "Approved Requisitions",
            value: summary.totalApprovedRequisitions,
            icon: <FaClipboardCheck className="text-white text-xl" />,
            color: "bg-blue-500",
          },
          {
            title: "Pending Requisitions",
            value: summary.totalPendingRequisitions,
            icon: <FaHourglassHalf className="text-white text-xl" />,
            color: "bg-purple-500",
          },
          {
            title: "Rejected Requisitions",
            value: summary.totalRejectedRequisitions,
            icon: <FaTimesCircle className="text-white text-xl" />,
            color: "bg-red-500",
          },
          {
            title: "Departments Involved",
            value: summary.totalDepartments,
            icon: <FaBuilding className="text-white text-xl" />,
            color: "bg-indigo-500",
          },
          {
            title: "Top Material",
            value: summary.topRequestedMaterial,
            icon: <FaBoxOpen className="text-white text-xl" />,
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
            Purchase Requisition(s)
          </h2>
          <p className="text-sm text-slate-500">
            View, filter, or add new requisitions.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-5 py-2.5 rounded-full shadow-md transition-transform transform hover:scale-105"
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
