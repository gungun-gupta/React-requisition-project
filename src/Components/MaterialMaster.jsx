import React from "react";
import MaterialHeader from "./MaterialHeader";
import MaterialTable from "./MaterialTable";

const MaterialMaster = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <MaterialHeader />
        <MaterialTable />
      </div>
    </>
  );
};

export default MaterialMaster;
