import React, { useState,useEffect } from "react";
import AppBar from "./AppBar";
import Card from "./Card";
import PurchaseFormModal from "./PurchaseFormModel";
import PurchaseTable from "./PurchaseTable";
import { useNavigate } from "react-router-dom";


const Requisition = () => {
  const navigate =useNavigate();

  
  const handleAddItem = () => {
    console.log("Add Item Clicked");
    // Later this will open modal for purchase form
  };
  const handleLogout = () => {
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    navigate("/");
  };
  useEffect(() => {
    const cookieArr = document.cookie.split("; ");
    const userCookie = cookieArr.find((row) => row.startsWith("username="));
    if (!userCookie) {
      navigate("/"); // redirect to login if not logged in
    }
  }, [navigate]);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editData, setEditData] = useState(null);

  const handleAddClick = () => {
    setFormMode("add");
    setEditData(null);
    setShowForm(true);
  };
  

  const [purchaseList, setPurchaseList] = useState([
    {
      Sno: "1",
      DocumentNo: "doc-101",
      Module: "Inventory",
      Document_Type: "PR",
      Document_subtype: "RawMaterial",
      DocumentDate: "2025-03-27",
      PostingDate: "2025-03-27",
      CreatedBy: "Gungun",
      Plant: 101,
      Company: 1,
    },
    {
      Sno: "2",
      DocumentNo: "doc-102",
      Module: "Inventory",
      Document_Type: "PR",
      Document_subtype: "RawMaterial",
      DocumentDate: "2025-03-27",
      PostingDate: "2025-03-27",
      CreatedBy: "Sita",
      Plant: 101,
      Company: 1,
    },
  ]);

  const handleSave = (newData) => {
    if (formMode === "add") {
      setPurchaseList([...purchaseList, { ...newData, Sno: Date.now() }]);
    } else if (formMode === "edit") {
      setPurchaseList((prev) =>
        prev.map((item) => (item.Sno === newData.Sno ? newData : item))
      );
    }
    setShowForm(false);
  };

  const handleEdit = (rowData) => {
    setFormMode("edit");
    setEditData(rowData);
    setShowForm(true);
  };

  const handleDelete = (sno) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirm) {
      setPurchaseList(purchaseList.filter((item) => item.Sno !== sno));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <div className="flex-1 overflow-y-auto p-4">
        <Card onAdd={handleAddClick} />
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
      <div className="flex justify-center ">
      <button
        onClick={handleLogout}
        className=" w-32 h-10 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition"
      >
        Log Out
      </button>
      </div>
    </div>
  );
};
export default Requisition;
