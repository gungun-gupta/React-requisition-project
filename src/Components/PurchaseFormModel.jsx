import React, { useState, useEffect } from "react";

const PurchaseFormModal = ({ isOpen, onClose, onSave, mode, initialData }) => {
  const [form, setForm] = useState({
    Category: "Material",
    MaterialCode: "",
    Description: "",
    Unit: "",
    Quantity: "",
    DeliveryDate: "",
    Document_Type: "",
    Document_subtype: "",
    CreatedBy: "",
    CreatedOn: new Date().toISOString().slice(0, 10), // today
  });

  const [tempItems, setTempItems] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    } else {
      setForm({
        Category: "Material",
        MaterialCode: "",
        Description: "",
        Unit: "",
        Quantity: "",
        DeliveryDate: "",
        Document_Type: "",
        Document_subtype: "",
        CreatedBy: "",
        CreatedOn: new Date().toISOString().slice(0, 10),
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
    if (!form.Quantity || Number(form.Quantity) <= 0) {
      newErrors.Quantity = "Quantity must be a positive number.";
    }
    if (!form.DeliveryDate || new Date(form.DeliveryDate) < new Date().setHours(0,0,0,0)) {
      newErrors.DeliveryDate = "Delivery date must be today or later.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToList = () => {
    if (!validateForm()) return;
    setTempItems((prev) => [...prev, { ...form, id: Date.now() }]);
    setForm((prev) => ({
      ...prev,
      MaterialCode: "",
      Description: "",
      Unit: "",
      Quantity: "",
      DeliveryDate: "",
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
            <select name="Category" value={form.Category} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="Material">Material</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <div>
            <label>Material Code</label>
            <input type="text" name="MaterialCode" value={form.MaterialCode} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label>Description</label>
            <input type="text" name="Description" value={form.Description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label>Unit of Measurement</label>
            <input type="text" name="Unit" value={form.Unit} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label>Quantity</label>
            <input type="number" name="Quantity" value={form.Quantity} onChange={handleChange} className={`w-full border px-3 py-2 rounded ${errors.Quantity ? "border-red-500" : "border-gray-300"}`} />
            {errors.Quantity && <p className="text-red-500 text-sm">{errors.Quantity}</p>}
          </div>

          <div>
            <label>Delivery Date</label>
            <input type="date" name="DeliveryDate" value={form.DeliveryDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full border px-3 py-2 rounded" />
            {errors.DeliveryDate && <p className="text-red-500 text-sm">{errors.DeliveryDate}</p>}
          </div>

          <div>
            <label>Document Type</label>
            <input type="text" name="Document_Type" value={form.Document_Type} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label>Document Subtype</label>
            <input type="text" name="Document_subtype" value={form.Document_subtype} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label>Created By</label>
            <input type="text" name="CreatedBy" value={form.CreatedBy} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label>Created On</label>
            <input type="date" name="CreatedOn" value={form.CreatedOn} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>
        </form>

        <div className="flex justify-end mt-4">
          <button onClick={handleAddToList} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
                  <td className="border px-2 py-1">{item.MaterialCode}</td>
                  <td className="border px-2 py-1">{item.Description}</td>
                  <td className="border px-2 py-1">{item.Unit}</td>
                  <td className="border px-2 py-1">{item.Quantity}</td>
                  <td className="border px-2 py-1">{item.DeliveryDate}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => handleDeleteItem(item.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
              {tempItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-2">No items added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={handleSaveAll} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Save All Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFormModal;
