import React, { useState, useEffect } from "react";
import RequisitionService from "../services/requisition.service";
import Card from "./Card";
import PurchaseFormModal from "./PurchaseFormModel";
import PurchaseTable from "./PurchaseTable";
import { useNavigate } from "react-router-dom";

const Requisition = () => {
  const navigate = useNavigate();

  // Login check using correct cookie name (user)
  useEffect(() => {
    const cookieArr = document.cookie.split("; ");
    const userCookie = cookieArr.find((row) => row.startsWith("user="));
    if (!userCookie) {
      navigate("/"); //if not logged in, go to login
    } else {
      //else Fetch data from API
      RequisitionService.getRequisitions()
        .then((result) => {
          if (result) {
            setPurchaseList(result); //Show on table
            setAllPurchases(result); //Show full list (for filtering)
          }
        })
        .catch((error) => {
          console.error("Error loading requisitions:", error);
        });
    }
  }, [navigate]);

  const [formMode, setFormMode] = useState("add");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [purchaseList, setPurchaseList] = useState([]);
  //   {
  //     Sno: 1,
  //     RequisitionNo: "REQ-1001",
  //     Document_Type: "Request",
  //     Document_subtype: "Material",
  //     CreatedBy: "Gungun",
  //     CreatedOn: "2023-09-30",
  //     MaterialCode: "MAT123",
  //     Description: "Steel Rod",
  //     Unit: "KG",
  //     Quantity: "50",
  //     DeliveryDate: "2025-06-26",
  //   },
  // ]);

  // Keep full list for filtering
  const [allPurchases, setAllPurchases] = useState(purchaseList);

  // Add button
  const handleAddClick = () => {
    setFormMode("add");
    setEditData(null);
    setShowForm(true);
  };

  // Edit
  const handleEdit = (item) => {
    console.log("editing this item:", item);
    setFormMode("edit");
    setEditData(item);
    setShowForm(true);
  };

  // Save/Add or Edit item(s)
  const handleSave = (items) => {
    // Clean each item: remove internal id, wrap in array
    const cleanedItems = items.map(({ id, ...rest }) => rest);

    if (formMode === "add") {
      RequisitionService.createRequisition(cleanedItems)
        .then(() => {
          console.log("Requisition added successfully");
          setPurchaseList((prev) => [...prev, ...items]); // still use items with id in UI
          setAllPurchases((prev) => [...prev, ...items]);
        })
        .catch((err) => console.error("Error creating requisition:", err));
    } else if (formMode === "edit" && items.length === 1) {
      const updatedItem = items[0];
      RequisitionService.updateRequisition(updatedItem.documentNo , updatedItem)
        .then(() => {
          console.log("Requisition updated");
          const updatedList = purchaseList.map((item) =>
            item.documentNo === updatedItem.documentNo ? updatedItem : item
          );
          setPurchaseList(updatedList);
          setAllPurchases(updatedList);
        })
        .catch((err) => console.error("Error updating requisition:", err));
    }

    setShowForm(false);
  };
  const fetchRequisitions = () => {
    RequisitionService.getRequisitions()
      .then((result) => {
        if (result) {
          setPurchaseList(result);
          setAllPurchases(result);
        }
      })
      .catch((err) => console.error("Error refreshing data:", err));
  };

  // Delete
  const handleDelete = (sno) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      RequisitionService.deleteRequisition(sno)
        .then(() => fetchRequisitions()) //refereh after delete
        .catch((err) => console.error("Delete failed:", err));
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
