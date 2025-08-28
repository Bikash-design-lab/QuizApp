import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) => `
    px-4 py-1 text-2xl rounded-lg transition duration-300 transform 
    hover:bg-red-600 hover:scale-105
    ${isActive ? 'bg-red-500' : ''}
  `;

  return (
    <nav className="bg-gradient-to-r from-purple-400 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-around items-center w-full">
            <NavLink className={navLinkStyle} to="/">Home</NavLink>
            <NavLink className={navLinkStyle} to="/Quiz">Quiz</NavLink>
            <NavLink className={navLinkStyle} to="/LeaderBoard">Leaderboard</NavLink>
            <NavLink className={navLinkStyle} to="/Register">Register</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-purple-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink className={navLinkStyle} to="/">Home</NavLink>
              <NavLink className={navLinkStyle} to="/Quiz">Quiz</NavLink>
              <NavLink className={navLinkStyle} to="/LeaderBoard">Leaderboard</NavLink>
              <NavLink className={navLinkStyle} to="/Register">Register</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;