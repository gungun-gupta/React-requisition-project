// src/components/MaterialTable.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialRow from "./MaterialRow";
import MaterialService from "../services/material.service";

const MaterialTable = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieArr = document.cookie.split("; ");
    const userCookie = cookieArr.find((row) => row.startsWith("user="));

    if (!userCookie) {
      navigate("/"); // Not logged in
    } else {
      MaterialService.getMaterials()
        .then((data) => {
          if (data) {
            setMaterials(data);
          }
        })
        .catch((err) => {
          console.error("Error loading material data:", err);
        });
    }
  }, [navigate]);

  return (
    <div className="mt-6 bg-white rounded-md shadow overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
        <thead className="bg-blue-100 text-blue-700 uppercase">
          <tr>
            <th className="px-4 py-3"></th>
            <th className="px-4 py-3">Material Code</th>
            <th className="px-4 py-3">Brand Code</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Main Group</th>
            <th className="px-4 py-3">Sub Group</th>
            <th className="px-4 py-3">Created By</th>
            <th className="px-4 py-3">Created On</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {materials.map((material) => (
            <MaterialRow key={material.id} material={material} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialTable;
