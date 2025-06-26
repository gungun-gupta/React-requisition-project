import axios from "axios";
import { get } from "react-hook-form";
const apiUrl = import.meta.env.VITE_API_URL || "https://localhost:5000";

const loginUser = async (username, password) => {
  try {
    const loginResponse = await axios.get(
      `${apiUrl}/User/Checklogin/${username}/${password}`
    );
    const response = await axios.post(
      `${apiUrl}/User/token`,
      loginResponse.data
    );
    document.cookie = `token=${encodeURIComponent(
      response.data
    )}; path=/; max-age=604800`;
    document.cookie = `user=${encodeURIComponent(
      username
    )}; path=/; max-age=604800`;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error in login request: " + error.message);
    }
  }
};
const getUser = () => {
  const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="));
  return userCookie ? decodeURIComponent(userCookie.split("=")[1]) : null;
};
const getToken = () => {
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};
const logoutUser = () => {
  document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;" ;
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;" ;
    location.reload();

  }
const LoginService = {
  loginUser: loginUser,
  getUser: getUser,
  getToken: getToken,
  logoutUser: logoutUser,
};
export default LoginService;
