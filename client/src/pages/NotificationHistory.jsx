// src/pages/NotificationHistory.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotificationHistory = () => {
  return (
    <div className="h-screen bg-gray-50">
      <Navbar title="Notification History" showBell={false} />

      <main className="mt-16 p-8">
        <div className="flex justify-between items-center border-b pb-2 mb-6">
          
          <Link
            to="/"
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Add your notification history content here */}
        <p className="text-gray-600">You have no past notifications logged.</p>
      </main>
    </div>
  );
};

export default NotificationHistory;
