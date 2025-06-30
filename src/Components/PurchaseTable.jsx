import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PurchaseTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6 max-w-7xl mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Req No</th>
            <th className="px-4 py-2">Doc Type</th>
            <th className="px-4 py-2">Doc Subtype</th>
            <th className="px-4 py-2">Created By</th>
            <th className="px-4 py-2">Created On</th>
            <th className="px-4 py-2">Material Code</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Unit</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Delivery Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  {item.RequisitionNo || `REQ-${item.Sno}`}
                </td>
                <td className="px-4 py-2">{item.documentType}</td>
                <td className="px-4 py-2">{item.documentSubtype}</td>
                <td className="px-4 py-2">{item.createdBy}</td>
                <td className="px-4 py-2">{item.createdOn}</td>
                <td className="px-4 py-2">{item.mtCode}</td>
                <td className="px-4 py-2">{item.mtDesc1}</td>
                <td className="px-4 py-2">{item.uom}</td>
                <td className="px-4 py-2">{item.prquantity}</td>
                <td className="px-4 py-2">{item.deliveryDate}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.Sno)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center text-gray-500 py-4">
                No requisitions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
