import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const MaterialRow = ({ material }) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <>
      <tr className="border-b hover:bg-blue-50 transition">
        <td className="px-2 py-3 text-center">
          <button
            onClick={toggleExpand}
            className="text-blue-600 hover:underline"
            title="Expand"
          >
            {expanded ? "▲" : "▼"}
          </button>
        </td>
        <td className="px-4 py-3">{material.documentNo}</td>
        <td className="px-4 py-3">{material.brandCode || "-"}</td>
        <td className="px-4 py-3">{material.mtDesc1}</td>
        <td className="px-4 py-3">{material.documentType || "Material"}</td>
        <td className="px-4 py-3">{material.mainGroup}</td>
        <td className="px-4 py-3">{material.subGroup || "-"}</td>
        <td className="px-4 py-3">{material.createdBy}</td>
        <td className="px-4 py-3">
          {material.createdOn
            ? format(new Date(material.createdOn), "yyyy-MM-dd")
            : "-"}
        </td>
        <td className="px-4 py-3 text-center">
          <div className="flex justify-center gap-4">
            {/* Edit Button */}
            <button
              onClick={() => navigate("/material/edit/${material.id}")}
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
            <button className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
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
      {expanded && (
        <tr className="bg-gray-50 border-t">
          <td colSpan="10" className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {/* Account Info */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition">
                <h4 className="text-blue-600 text-lg font-semibold border-b pb-2 mb-3 flex items-center gap-2">
                  🧾 Account Info
                </h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Main Group:</span>
                    <span className="font-medium text-gray-800">
                      {material.mainGroup}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub Group:</span>
                    <span className="font-medium text-gray-800">
                      {material.subGroup || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plant:</span>
                    <span className="font-medium text-gray-800">
                      {material.plant}
                    </span>
                  </div>
                </div>
              </div>

              {/* Material Info */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition">
                <h4 className="text-green-600 text-lg font-semibold border-b pb-2 mb-3 flex items-center gap-2">
                  📋 Material Info
                </h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Document No:</span>
                    <span className="font-medium text-gray-800">
                      {material.documentNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Document Type:</span>
                    <span className="font-medium text-gray-800">
                      {material.documentType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>UOM:</span>
                    <span className="font-medium text-gray-800">
                      {material.uom}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Description:</span>
                    <span className="font-medium text-gray-800">
                      {material.mtDesc2 || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Info */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition">
                <h4 className="text-amber-600 text-lg font-semibold border-b pb-2 mb-3 flex items-center gap-2">
                  💰 Pricing Info
                </h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Price/Unit:</span>
                    <span className="font-medium text-gray-800">
                      ₹{material.price ?? " -"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pricing Method:</span>
                    <span className="font-medium text-gray-800">
                      {material.priceControl}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exclude from GST:</span>
                    <span className="font-medium text-gray-800">
                      {material.excludeGst ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>HSN Code:</span>
                    <span className="font-medium text-gray-800">
                      {material.hsnCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default MaterialRow;
