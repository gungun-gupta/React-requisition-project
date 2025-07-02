import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PurchaseTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="mt-6 bg-white rounded-md shadow overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
        <thead className="bg-blue-100 text-blue-700 uppercase">
          <tr>
            {/* <th className="px-4 py-2">Req No</th> */}
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
                {/* <td className="px-4 py-2">
                  {item.RequisitionNo || `REQ-${item.Sno}`}
                </td> */}
                <td className="px-4 py-2">{item.documentType}</td>
                <td className="px-4 py-2">{item.documentSubtype}</td>
                <td className="px-4 py-2">{item.createdBy}</td>
                <td className="px-4 py-2">{item.createdOn}</td>
                <td className="px-4 py-2">{item.mtCode}</td>
                <td className="px-4 py-2">{item.mtDesc1}</td>
                <td className="px-4 py-2">{item.uom}</td>
                <td className="px-4 py-2">{item.prquantity}</td>
                <td className="px-4 py-2">{item.deliveryDate}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-4">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(item)}
                      className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536M9 11l3.536 3.536L21 9M3 21h4l11-11a2 2 0 00-2.828-2.828L3 17v4z"
                        />
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(item.Sno)}
                      className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-3h4m-4 0a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1m-4 0h4"
                        />
                      </svg>
                    </button>
                  </div>
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
