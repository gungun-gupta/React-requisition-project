import React, { useEffect, useState } from "react";
// import SupplierForm from "./SupplierForm";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";

export default function SupplierMaster() {
  const { register, handleSubmit, reset } = useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(false);
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    count: 100,
  });

  const onSubmit = (data) => {
    setSuppliers((prev) => [
      ...prev,
      { id: Date.now(), ...data, date: new Date().toISOString().split("T")[0] },
    ]);
    setForm(false);
    reset();
  };

  const filteredSuppliers = suppliers
    .filter((s) => {
      const recordDate = new Date(s.date);
      const from = filter.fromDate ? new Date(filter.fromDate) : null;
      const to = filter.toDate ? new Date(filter.toDate) : null;

      return (!from || recordDate >= from) && (!to || recordDate <= to);
    })
    .slice(0, filter.count);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSuppliers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
    XLSX.writeFile(workbook, "SupplierReport.xlsx");
  };

  return (
    <div>
      <div className=" min-h-50 p-5 flex flex-col justify-between items-center">
        <h2 className="text-2xl font-bold justify-start">
          Supplier Report
          <br />
        </h2>

        <div className="bg-white shadow-md shadow-gray-300 p-6 rounded-xl flex flex-col gap-4 mb-6 max-w-xl w-full">
          <button
            onClick={() => setForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-lg transition duration-200 w-fit"
          >
            + Add Item
          </button>

          <div className="flex flex-col">
            <label
              htmlFor="recordCount"
              className="text-sm text-black font-medium mb-1"
            >
              No of Records
            </label>
            <select
              id="recordCount"
              value={filter.count}
              onChange={(e) =>
                setFilter({ ...filter, count: parseInt(e.target.value) })
              }
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option>100</option>
              <option>200</option>
              <option>500</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="fromDate"
              className="text-sm text-black font-medium mb-1"
            >
              From Date
            </label>
            <input
              id="fromDate"
              type="date"
              value={filter.fromDate}
              onChange={(e) =>
                setFilter({ ...filter, fromDate: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="toDate"
              className="text-sm text-black font-medium mb-1"
            >
              To Date
            </label>
            <input
              id="toDate"
              type="date"
              value={filter.toDate}
              onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            onClick={exportToExcel}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-lg transition duration-200 w-fit"
          >
            Export To Excel
          </button>
        </div>

        <table className="min-w-full border text-sm text-left shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2">Supplier Name</th>
              <th className="border px-3 py-2">GST Number</th>
              <th className="border px-3 py-2">PAN Number</th>
              <th className="border px-3 py-2">Promoter</th>
              <th className="border px-3 py-2">Entered By</th>
              <th className="border px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((s) => (
              <tr key={s.id}>
                <td className="border px-3 py-1">{s.name}</td>
                <td className="border px-3 py-1">{s.gst}</td>
                <td className="border px-3 py-1">{s.pan}</td>
                <td className="border px-3 py-1">{s.promoter}</td>
                <td className="border px-3 py-1">{s.enteredBy}</td>
                <td className="border px-3 py-1">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {form && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center pt-10 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Add Supplier</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <fieldset>
                  <input
                    {...register("name", { required: true })}
                    placeholder="Supplier Name"
                    className="border p-2 w-full rounded"
                  />
                </fieldset>
                <input
                  {...register("gst", { required: true })}
                  placeholder="GST Number"
                  className="border p-2 w-full rounded"
                />
                <input
                  {...register("pan", { required: true })}
                  placeholder="PAN Number"
                  className="border p-2 w-full rounded"
                />
                <input
                  {...register("promoter", { required: true })}
                  placeholder="Promoter"
                  className="border p-2 w-full rounded"
                />
                <input
                  {...register("enteredBy", { required: true })}
                  placeholder="Entered By"
                  className="border p-2 w-full rounded"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setForm(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
