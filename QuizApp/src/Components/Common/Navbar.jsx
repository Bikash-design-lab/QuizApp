import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-gradient-to-r  from-purple-400 to-indigo-600 text-white text-lg flex justify-around items-center py-4 shadow-lg">
        <NavLink
          className="px-4 py-1 text-2xl rounded-lg transition duration-300 transform hover:bg-red-600 hover:scale-105"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="px-4 py-1 text-2xl rounded-lg transition duration-300 transform hover:bg-red-600 hover:scale-105"
          to="/Quiz"
        >
          Quiz
        </NavLink>
        <NavLink
          className="px-4 py-1 text-2xl rounded-lg transition duration-300 transform hover:bg-red-600 hover:scale-105"
          to="/LeaderBoard"
        >
          Leaderboard
        </NavLink>
        <NavLink
          className="px-4 py-1 text-2xl rounded-lg transition duration-300 transform hover:bg-red-600 hover:scale-105"
          to="/Register"
        >
          Register
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
