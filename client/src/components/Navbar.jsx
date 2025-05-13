// src/components/Navbar.jsx
import React from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ title = "Dashboard", notifications = [], onNotificationClick, showBell = true }) => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 w-full">
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-gray-800">{title}</div>
        <div className="flex items-center space-x-4 relative">
          {showBell && (
            <button
              onClick={onNotificationClick}
              className="relative text-gray-800 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FaBell className="h-6 w-6" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
