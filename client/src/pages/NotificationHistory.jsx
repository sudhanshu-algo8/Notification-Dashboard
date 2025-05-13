import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api"; // Import the API services

const NotificationHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await api.getHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="h-screen bg-gray-50">
      <Navbar title="Notification History" showBell={false} />

      <main className="mt-16 p-8">
        <div className="flex justify-between items-center border-b pb-2 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Notification History</h1>
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            Back to Dashboard
          </Link>
        </div>

        {/* If no notifications */}
        {history.length === 0 ? (
          <p className="text-gray-600">You have no past notifications logged.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {history.map((notification) => (
                  <tr key={notification._id} className="border-b">
                    <td className="px-4 py-2">{notification.title}</td>
                    <td className="px-4 py-2">{notification.message}</td>
                    <td className="px-4 py-2">{notification.type}</td>
                    <td className="px-4 py-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationHistory;
