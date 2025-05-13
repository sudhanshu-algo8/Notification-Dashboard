// src/components/NotificationPanel.jsx
import React from "react";
import NotificationItem from "./NotificationItem";
import { FaTimesCircle } from "react-icons/fa";

const NotificationPanel = ({ notifications, setPanelOpen, setNotifications }) => {
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="w-80 sm:w-96 bg-white shadow-xl rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Notifications ({notifications.filter((notification) => !notification.read).length})
        </div>
        <button
          onClick={() => setPanelOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimesCircle className="h-6 w-6" />
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No notifications</div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;