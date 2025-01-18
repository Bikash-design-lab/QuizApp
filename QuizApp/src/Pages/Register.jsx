import React, { useState } from "react";

const Register = () => {
  const token = Boolean(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(token);

  const handleLogin = () => {
    localStorage.setItem("authToken", "Vikas");
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center">
        <div className="mb-8">
          {isLoggedIn ? (
            <div className="text-green-600">
              <div className="text-6xl mb-4">🤩</div>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-gray-600 mt-2">
                You are successfully logged in
              </p>
            </div>
          ) : (
            <div className="text-gray-600">
              <div className="text-6xl mb-4">😔</div>
              <h1 className="text-2xl font-bold">Hello, Guest</h1>
              <p className="text-gray-600 mt-2">Please log in to continue</p>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <button
            onClick={handleLogOut}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold
                     transform transition duration-200 hover:bg-red-600 hover:scale-105
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold
                     transform transition duration-200 hover:bg-blue-600 hover:scale-105
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
