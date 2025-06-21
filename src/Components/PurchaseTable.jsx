import React from "react";

const PurchaseTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mt-6 max-w-6xl mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              S.No
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Document No
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Module
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Doc Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Doc Subtype
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Doc Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Posting Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Created By
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, index) => (
            <tr key={item.Sno}>
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2 text-sm">{item.DocumentNo}</td>
              <td className="px-4 py-2 text-sm">{item.Module}</td>
              <td className="px-4 py-2 text-sm">{item.Document_Type}</td>
              <td className="px-4 py-2 text-sm">{item.Document_subtype}</td>
              <td className="px-4 py-2 text-sm">{item.DocumentDate}</td>
              <td className="px-4 py-2 text-sm">{item.PostingDate}</td>
              <td className="px-4 py-2 text-sm">{item.CreatedBy}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.Sno)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No purchase requisitions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
