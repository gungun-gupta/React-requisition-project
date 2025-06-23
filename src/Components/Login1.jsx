import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";


function Login1() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const cookieArr = document.cookie.split("; ");
    const userCookie = cookieArr.find((row) => row.startsWith("username="));
    if (userCookie) {
      setIsLoggedIn(true);
      navigate("/requisition"); // optional: auto-redirect
    }
  }, [navigate]);

  const handleLogin = (data) => {
    document.cookie = `username=${encodeURIComponent(data.username)}; path=/; max-age=604800`;
    setIsLoggedIn(true);
    navigate("/requisition");
  };

  const handleLogout = () => {
    // Expire the cookie
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsLoggedIn(false);
    navigate("/"); // back to login
  };

  return (
    <div className="min-h-screen flex items-center border-2 justify-center border-indigo-600">
      <div className="bg-white rounded-xl shadow-lg px-6 py-8 w-full max-w-sm">

        <img src={logo} alt="RG Logo" className="h-16 w-auto mx-auto mb-4" />
        
        <h2 className="text-center text-2xl font-semibold text-black-600 mb-4">
          Welcome to RG Group
        </h2>

        {isLoggedIn ? (
          <div className="text-center space-y-4">
            <p className="text-gray-700">You're already logged in.</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm text-black-600 mb-1">
                Username:
              </label>
              <input
                id="username"
                type="text"
                className={`w-full px-3 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-400 focus:border-indigo-500 outline-none`}
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-black-600 mb-1">
                Password:
              </label>
              <input
                id="password"
                type="password"
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-400 focus:border-indigo-500 outline-none`}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Must include upper, lower, number, special char, and 8+ characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Forgot password?</span>
              <a href="#" className="text-indigo-500 hover:underline">Reset</a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-500 transition"
            >
              Sign In
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">Contact Admin</a>
        </p>
      </div>
    </div>
  );
}

export default Login1;
