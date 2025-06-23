import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Try = ({ isOpen, onClose, onSave, mode, initialData }) => {
  const navigate =useNavigate();
  const [form, setForm] = useState({
    DocumentNo: "",
    Module: "",
    Document_Type: "",
    Document_subtype: "",
    DocumentDate: "",
    PostingDate: "",
    CreatedBy: "",
    Plant: "",
    Company: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    } else {
      setForm({
        DocumentNo: "",
        Module: "",
        Document_Type: "",
        Document_subtype: "",
        DocumentDate: "",
        PostingDate: "",
        CreatedBy: "",
        Plant: "",
        Company: "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "edit" ? "Edit Purchase" : "Add New Purchase"}
          </h2>
          <button onClick={onClose} className="text-red-600 font-bold text-lg">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            "DocumentNo",
            "Module",
            "Document_Type",
            "Document_subtype",
            "DocumentDate",
            "PostingDate",
            "CreatedBy",
            "Plant",
            "Company",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field}
              </label>
              <input
                type={field.toLowerCase().includes("date") ? "date" : "text"}
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
          ))}
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {mode === "edit" ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Try;
