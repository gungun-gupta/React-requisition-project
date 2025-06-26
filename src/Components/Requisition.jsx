import React, { useState, useEffect } from "react";
import Card from "./Card";
import PurchaseFormModal from "./PurchaseFormModel";
import PurchaseTable from "./PurchaseTable";
import { useNavigate } from "react-router-dom";

const Requisition = () => {
  const navigate = useNavigate();

  // ✅ Login check using correct cookie name (user)
  useEffect(() => {
    const cookieArr = document.cookie.split("; ");
    const userCookie = cookieArr.find((row) => row.startsWith("user="));
    if (!userCookie) {
      navigate("/"); // redirect to login if not logged in
    }
  }, [navigate]);

  const [formMode, setFormMode] = useState("add");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [purchaseList, setPurchaseList] = useState([
    {
      Sno: 1,
      RequisitionNo: "REQ-1001",
      Document_Type: "Request",
      Document_subtype: "Material",
      CreatedBy: "Gungun",
      CreatedOn: "2023-09-30",
      MaterialCode: "MAT123",
      Description: "Steel Rod",
      Unit: "KG",
      Quantity: "50",
      DeliveryDate: "2025-06-26",
    },
  ]);

  // 🔁 Keep full list for filtering
  const [allPurchases, setAllPurchases] = useState(purchaseList);

  // Add button
  const handleAddClick = () => {
    setFormMode("add");
    setEditData(null);
    setShowForm(true);
  };

  // Edit
  const handleEdit = (item) => {
    setFormMode("edit");
    setEditData(item);
    setShowForm(true);
  };

  // Save/Add or Edit item(s)
  const handleSave = (newItems) => {
    if (formMode === "add") {
      const newWithSno = newItems.map((item, index) => ({
        ...item,
        Sno: Date.now() + index, // unique Sno
      }));
      setPurchaseList((prev) => [...prev, ...newWithSno]);
      setAllPurchases((prev) => [...prev, ...newWithSno]); // update master list
    } else if (formMode === "edit" && newItems.length === 1) {
      const updatedItem = newItems[0];
      const updatedList = purchaseList.map((item) =>
        item.Sno === updatedItem.Sno ? updatedItem : item
      );
      setPurchaseList(updatedList);
      setAllPurchases(updatedList); // update master list
    }
    setShowForm(false);
  };

  // Delete
  const handleDelete = (sno) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const filtered = purchaseList.filter(
        (item) => String(item.Sno) !== String(sno)
      );
      setPurchaseList(filtered);
      setAllPurchases(filtered); // update master list
    }
  };

  // Filter
  const handleFilter = (fromDate, toDate) => {
    const filtered = allPurchases.filter((item) => {
      const itemDate = new Date(item.CreatedOn);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });
    setPurchaseList(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <Card onAdd={handleAddClick} onFilter={handleFilter} />
        <PurchaseTable
          data={purchaseList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <PurchaseFormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          mode={formMode}
          initialData={editData}
        />
      </div>
    </div>
  );
};

export default Requisition;
