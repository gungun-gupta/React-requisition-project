import React, { useState } from "react";

const Card = ({ onAdd }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilter = () => {
    console.log("Filtering from:", fromDate, "to:", toDate);
    // You can pass these values to a parent filter function if needed
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-6 mx-auto max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Purchase Requisition(s)</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Item
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
