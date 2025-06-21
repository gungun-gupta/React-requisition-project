import React, { useState } from "react";
import AppBar from "./AppBar";
import Card from "./Card";
import PurchaseFormModal from "./PurchaseFormModel";
import PurchaseTable from "./PurchaseTable";

const Requisition = () => {
  const handleAddItem = () => {
    console.log("Add Item Clicked");
    // Later this will open modal for purchase form
  };

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
    <>
      <div>
        <AppBar />
      </div>
      <div className="p-4">
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
    </>
  );
};

export default Requisition;
