//Import Axios to make HTTP requests
import axios from "axios";

//Import LoginService to get the token of the logged-in user
import LoginService from "./login.service";

//Get the base API URL from .env file (fallback to localhost if missing)
const apiUrl = import.meta.env.VITE_API_URL || "https://localhost:5000";

//Function to GET all requisitions from the server
const getRequisitions = () => {
  const token = LoginService.getToken(); // Get auth token from login
  return axios 
    .get(`${apiUrl}/Requisition`, {
      headers: {
        Authorization: `${token}`, // Send token in Authorization header to ptove we're logged in
      },
    })
    .then((response) => response.data) // Return the data from response
    .catch((error) => {
      console.error("Error getting requisitions:", error);
      return null;
    });
};

// ➕ POST for create or update
// const upsertRequisition = (data) => {
//   const token = LoginService.getToken();
//   return axios
//     .post(`${apiUrl}`/Requisition, data, {
//       headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => res.data)
//     .catch((err) => {
//       console.error("❌ Error upserting requisition:", err);
//       return null;
//     });
// };


// Function to POST (add) a new requisition
const createRequisition = (data) => { 
    const payload = {
    data: data, // ✅ wrap array inside `data`
  };
  const token = LoginService.getToken();
  // console.log("🔼 Data being sent to API:", data);
  return axios
    .post(`${apiUrl}/Requisition`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating requisition:", error);
      return null;
    });
};

// Function to PUT (update) an existing requisition
// const updateRequisition = (id, data) => {
//   const token = LoginService.getToken();
//   return axios
//     .post(`${apiUrl}/Requisition/${id}`, data, {
//       headers: {
//         Authorization: `${token}`,
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error updating requisition:", error);
//       return null;
//     });
// };

const updateRequisition = (data) => {
  const token = LoginService.getToken();

  // Remove 'id' from the object
  const { id: _, ...cleanedData } = data;
  return axios
    .post(`${apiUrl}/Requisition`, [cleanedData], {
      headers: {
        Authorization: `${token}`,
       'Content-Type': 'application/json',
      },
      // maxBodyLength:Infinity,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating requisition:", error);
      return null;
    });
};

//Function to DELETE a requisition by S.No.
const deleteRequisition = (sno) => {
  const token = LoginService.getToken();
  return axios
    .delete(`${apiUrl}/Requisition/${sno}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting requisition:", error);
      return null;
    });
};

//Export all service functions together
const RequisitionService = {
  getRequisitions,
  createRequisition,
  updateRequisition,
  // upsertRequisition,
  deleteRequisition,
};

export default RequisitionService;
