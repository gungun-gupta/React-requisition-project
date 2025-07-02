import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const MaterialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const selectedCategory = watch("category");

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/materials/${id}`)
        .then((res) => res.json())
        .then((data) => {
          reset({
            category: data.documentCategory || "Material",
            mainGroup: data.mainGroup || "",
            name: data.mtDesc1 || "",
            uom: data.uom || "",
            longDesc: data.mtDesc2 || "",
            safetyStock: data.safetyStock || "",
            minStock: data.minStock || "",
            maxStock: data.maxStock || "",
            openingStock: data.opStock || "",
            storageLocation: data.storageLocation || "",
            price: data.price || "",
            value: data.value || "",
            hsnCode: data.hsnCode || "",
          });
        });
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/materials/${id}` : `/api/materials`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        alert(`Material ${isEdit ? "updated" : "added"} successfully`);
        navigate("/material");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 bg-gradient-to-br from-gray-50 to-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">
        {isEdit ? "Edit Material / Service" : "Add New Material / Service"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Category */}
        <div>
          <label className="block text-blue-700 font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Material">Material</option>
            <option value="Service">Service</option>
          </select>
          {errors.category && (
            <p className="text-sm text-red-500 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Material Info */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Material Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label>
                Main Group <span className="text-red-500">*</span>
              </label>
              <select
                {...register("mainGroup", {
                  required: "Main group is required",
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Main Group</option>
                <option value="Raw Material">Raw Material</option>
                <option value="Semi Finished">Semi Finished</option>
                <option value="Finished">Finished</option>
                <option value="Consumables">Consumables</option>
              </select>
              {errors.mainGroup && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.mainGroup.message}
                </p>
              )}
            </div>

            <div>
              <label>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label>
                UOM <span className="text-red-500">*</span>
              </label>
              <select
                {...register("uom", { required: "UOM is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">Select UOM</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="MT">Metric Ton (MT)</option>
                <option value="m">Meter (m)</option>
              </select>
              {errors.uom && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.uom.message}
                </p>
              )}
            </div>

            <div>
              <label>Long Description</label>
              <textarea
                rows="3"
                {...register("longDesc")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Inventory Info - only if Material */}
        {selectedCategory === "Material" && (
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-blue-700 border-b pb-2">
              Inventory Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Safety Stock</label>
                <input
                  type="number"
                  min="0"
                  {...register("safetyStock")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label>Min Stock</label>
                <input
                  type="number"
                  min="0"
                  {...register("minStock")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label>Max Stock</label>
                <input
                  type="number"
                  min="0"
                  {...register("maxStock")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label>Opening Stock</label>
                <input
                  type="number"
                  {...register("openingStock")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label>Storage Location</label>
                <select
                  {...register("storageLocation")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="">Select Location</option>
                  <option value="GDW001">GDW001</option>
                  <option value="GDW002">GDW002</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Info */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-blue-700 border-b pb-2">
            Pricing Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label>Price</label>
              <input
                type="number"
                {...register("price")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label>Value</label>
              <input
                type="number"
                {...register("value")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label>
                HSN Code <span className="text-red-500">*</span>
              </label>
              <select
                {...register("hsnCode", { required: "HSN Code is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">Select HSN Code</option>
                <option value="HSN001">HSN001</option>
                <option value="HSN063">HSN063</option>
                <option value="HSN319">HSN319</option>
              </select>
              {errors.hsnCode && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.hsnCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition"
          >
            {isEdit ? "Update" : "Add"} Material
          </button>
          <button
            type="button"
            onClick={() => navigate("/MaterialMaster")}
            className="px-8 py-3 border bg-red-500 rounded-lg text-white hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaterialForm;
