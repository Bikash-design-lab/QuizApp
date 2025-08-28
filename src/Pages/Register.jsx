import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 🔄 Sync state with localStorage whenever component mounts
  useEffect(() => {
    const token = Boolean(localStorage.getItem("authToken"));
    setIsLoggedIn(token);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("authToken", "Vikas");
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/Register"); // ✅ optional: redirect to Register after logout
  };

  return (
    <div className="mt-32">
      <h1 className="text-2xl">
        {isLoggedIn ? "You are Logged in 🤩" : "You are NOT Logged in 😔"}
      </h1>

      <div className="flex justify-center gap-3 mt-5">
        {isLoggedIn ? (
          <button
            onClick={handleLogOut}
            className="border-4 px-6 py-1 font-bold text-white rounded bg-red-500 hover:bg-red-400 hover:text-black"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="border-4 px-6 py-1 font-bold text-white rounded bg-red-500 hover:bg-red-400 hover:text-black"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
