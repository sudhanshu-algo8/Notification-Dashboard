// src/components/NotificationItem.jsx
import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa"; // React Icons

const NotificationItem = ({ notification, onMarkAsRead, onDismiss }) => {
  const { id, title, message, type, read } = notification;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <FaInfoCircle className="text-blue-600" />;
      case "warning":
        return <FaExclamationCircle className="text-yellow-600" />;
      case "error":
        return <FaTimesCircle className="text-red-600" />;
      default:
        return null;
    }
  };

  const getNotificationClass = (type, read) => {
    return read
      ? "bg-gray-100 text-gray-800"
      : type === "info"
      ? "bg-blue-100 text-blue-800"
      : type === "warning"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div
      className={`flex items-center p-4 rounded-lg ${getNotificationClass(type, read)}`}
    >
      <div className="mr-4">{getNotificationIcon(type)}</div>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div>{message}</div>
      </div>
      <div className="flex space-x-2">
        {!read && (
          <button onClick={() => onMarkAsRead(id)} title="Mark as read">
            <FaCheckCircle className="text-blue-600" />
          </button>
        )}
        <button onClick={() => onDismiss(id)} title="Dismiss">
          <FaTimesCircle className="text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
