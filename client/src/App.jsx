import React, { useEffect, useState } from "react";
import NotificationPanel from "./components/NotificationPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import { socket } from "./services/socket";

function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [panelPosition, setPanelPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const handleNotification = (data) => {
      const newNotification = {
        id: data._id,
        title: data.title,
        message: data.message,
        type: data.type,
        read: false,
      };

      setNotifications((prev) => [newNotification,...prev]);

      toast(`${newNotification.title}: ${newNotification.message}`, {
        type: newNotification.type,
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: true,
      });
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  const handleNotificationClick = (e) => {
    if (panelOpen) {
      setPanelOpen(false);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setPanelPosition({
        top: rect.top + window.scrollY + rect.height + 10,
        right: window.innerWidth - rect.right + 10,
      });
      setPanelOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 w-full">
        <div className="flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-gray-900">
            <FaBell />
          </div>
        </div>
      </header>
      <NotificationPanel open={panelOpen} position={panelPosition} notifications={notifications} handleNotificationClick={handleNotificationClick} />
    </div>
  );
}