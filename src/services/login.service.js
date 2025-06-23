import axios from "axios";
const apiUrl = process.env.API_URL || "http://localhost:5000";

const loginUser = async (username, password) => {
  try {
    const loginResponse = await axios.get(
      `${apiUrl}/User/Checklogin/${username}/${password}`
    );
    const response = await axios.post(
      `${apiUrl}/User/token`,
      JSON.parse(loginResponse.data)
    );
                document.cookie = `token=${encodeURIComponent(response.data)}; path=/; max-age=604800`;
                document.cookie = `user=${encodeURIComponent(username)}; path=/; max-age=604800`;
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

const LoginService = {
  loginUser: loginUser,
};
export default LoginService;
