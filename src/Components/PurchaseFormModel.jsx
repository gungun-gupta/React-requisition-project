import React, { useState, useEffect } from "react";
import MaterialService from "../services/material.service";

const PurchaseFormModal = ({ isOpen, onClose, onSave, mode, initialData }) => {
  const [form, setForm] = useState({
    // id: "",
    documentNo: "",
    Category: "Material",
    mtCode: "",
    mtDesc1: "",
    uom: "",
    prquantity: "",
    deliveryDate: "",
    documentType: "",
    documentSubtype: "",
    createdBy: "",
    createdOn: new Date().toISOString().slice(0, 10), // today
  });

  const [tempItems, setTempItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [materialList, setMaterialList] = useState([]);

  useEffect(() => {
    MaterialService.getMaterials()
      .then((data) => {
        setMaterialList(data);
      })
      .catch((err) => console.error("Failed to fetch materials:", err));
  }, []);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    } else {
      setForm({
        // id: "",
        documentNo: "",
        Category: "Material",
        mtCode: "",
        mtDesc1: "",
        uom: "",
        prquantity: "",
        deliveryDate: "",
        documentType: "",
        documentSubtype: "",
        createdBy: "",
        createdOn: new Date().toISOString().slice(0, 10),
      });
    }
    setTempItems([]);
    setErrors({});
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.prquantity || Number(form.prquantity) <= 0) {
      newErrors.prquantity = "Quantity must be a positive number.";
    }
    if (
      !form.deliveryDate ||
      new Date(form.deliveryDate) < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.deliveryDate = "Delivery date must be today or later.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToList = () => {
    if (!validateForm()) return;
    setTempItems((prev) => [...prev, { ...form, id: Date.now() }]);
    setForm((prev) => ({
      ...prev,
      mtCode: "",
      mtDesc1: "",
      uom: "",
      prquantity: "",
      deliveryDate: "",
    }));
    setErrors({});
  };

  const handleDeleteItem = (id) => {
    setTempItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveAll = () => {
    if (tempItems.length === 0) {
      alert("Add at least one item to save.");
      return;
    }
    onSave(tempItems);
    onClose();
    setTempItems([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-10 z-50 overflow-auto">
      <div className="bg-white rounded-md shadow-lg w-full max-w-5xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "edit" ? "Edit Requisition" : "Add New Requisition"}
          </h2>
          <button onClick={onClose} className="text-red-600 font-bold text-lg">
            ✕
          </button>
        </div>

        <form className="grid grid-cols-2 gap-4">
          <div>
            <label>Category</label>
            <select
              name="Category"
              value={form.Category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Material">Material</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <div>
            <label>Material Code</label>
            <select
              name="mtCode"
              value={form.mtCode}
              onChange={(e) => {
                const selectedCode = e.target.value;
                const selectedMaterial = materialList.find(
                  (item) => item.documentNo === selectedCode
                );

                if (selectedMaterial) {
                  setForm((prev) => ({
                    ...prev,
                    mtCode: selectedMaterial.documentNo, 
                    mtDesc1: selectedMaterial.mtDesc1, 
                    uom: selectedMaterial.uom,
                    documentType: selectedMaterial.documentType,
                    documentSubtype: selectedMaterial.documentSubtype || "", 
                  }));
                } else {
                  setForm((prev) => ({
                    ...prev,
                    mtCode: "",
                    mtDesc1: "",
                    uom: "",
                    documentType: "",
                    documentSubtype: "",
                  }));
                }
              }}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Material Code</option>
              {materialList.map((material) => (
                <option key={material.id} value={material.documentNo}>
                  {material.documentNo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              name="mtDesc1"
              value={form.mtDesc1}
              onChange={handleChange}
              readOnly
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>Unit of Measurement</label>
            <input
              type="text"
              name="uom"
              value={form.uom}
              onChange={handleChange}
              readOnly
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="prquantity"
              value={form.prquantity}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.prquantity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.prquantity && (
              <p className="text-red-500 text-sm">{errors.prquantity}</p>
            )}
          </div>

          <div>
            <label>Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={form.deliveryDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm">{errors.deliveryDate}</p>
            )}
          </div>

          <div>
            <label>Document Type</label>
            <input
              type="text"
              name="documentType"
              value={form.documentType}
              onChange={handleChange}
              readOnly
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>Document Subtype</label>
            <input
              type="text"
              name="documentSubtype"
              value={form.documentSubtype}
              readOnly
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>Created By</label>
            <input
              type="text"
              name="createdBy"
              value={form.createdBy}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>Created On</label>
            <input
              type="date"
              name="createdOn"
              value={form.createdOn}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
        </form>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddToList}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to List
          </button>
        </div>

        {/* Table of selected items */}
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Selected Items</h3>
          <table className="w-full border text-sm table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Material Code</th>
                <th className="border px-2 py-1">Description</th>
                <th className="border px-2 py-1">Unit</th>
                <th className="border px-2 py-1">Quantity</th>
                <th className="border px-2 py-1">Delivery Date</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tempItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{item.mtCode}</td>
                  <td className="border px-2 py-1">{item.mtDesc1}</td>
                  <td className="border px-2 py-1">{item.uom}</td>
                  <td className="border px-2 py-1">{item.prquantity}</td>
                  <td className="border px-2 py-1">{item.deliveryDate}</td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {tempItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-2">
                    No items added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveAll}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save All Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFormModal;
