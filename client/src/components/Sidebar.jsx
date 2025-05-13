// src/components/Sidebar.jsx
import React from "react";
import { FaHome, FaCog, FaListAlt } from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed sm:relative top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform duration-300 z-20 sm:translate-x-0`}
    >
      <div className="p-4">
        <div className="text-2xl font-bold">Dashboard</div>
      </div>
      <ul>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-700 cursor-pointer">
          <FaHome className="h-5 w-5" />
          <span>Home</span>
        </li>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-700 cursor-pointer">
          <FaCog className="h-5 w-5" />
          <span>Settings</span>
        </li>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-700 cursor-pointer">
          <FaListAlt className="h-5 w-5" />
          <span>Logs</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
