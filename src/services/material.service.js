// src/services/MaterialService.js
import axios from "axios";
import LoginService from "./login.service";

// we can also use `.env` variable here
const apiUrl = "https://aonapps.in:6066/Material/master";

// Function to get all materials
const getMaterials = () => {
  const token = LoginService.getToken(); // get token from login service
  return axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // attaching bearer token
      },
      maxBodyLength: Infinity,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching material master:", err);
      return null;
    });
};

const MaterialService = {
  getMaterials,
};

export default MaterialService;
