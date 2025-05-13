// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import NotificationPanel from "../components/NotificationPanel";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "../services/socket";
import api from "../services/api";

function Dashboard() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [panelPosition, setPanelPosition] = useState({ top: 0, right: 0 });
  const [socketConnected, setSocketConnected] = useState(false);
  const [clientCount, setClientCount] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(null);

  useEffect(() => {
    const handleNotification = (data) => {
      const newNotification = {
        id: data._id,
        title: data.title,
        message: data.message,
        type: data.type,
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      toast(`${newNotification.title}: ${newNotification.message}`, {
        type: newNotification.type,
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: true,
      });
    };

    const fetchTotalNotifications = async () => {
      try {
        const total = api.getTotalNotifications();
        setTotalNotifications(total);
      } catch (error) {
        console.error("Error fetching total notifications:", error);
      }
    };

    fetchTotalNotifications();

    const handleConnect = () => {
      console.log("Connected");
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected");
      setSocketConnected(false);
    };

    const handleClientCount = (count) => {
      console.log("👥 Total connected clients:", count);
      setClientCount(count);
    };

    socket.on("notification", handleNotification);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("clientCount", handleClientCount);
    setSocketConnected(socket.connected);

    return () => {
      socket.off("notification", handleNotification);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("clientCount", handleClientCount);
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
      <Navbar notifications={notifications} onNotificationClick={handleNotificationClick} title='Dashboard'/>

      <main className="mt-16 p-8 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-lg font-bold">Total Users</div>
            <div className="text-4xl">{clientCount}</div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-lg font-bold">Server Status</div>
            <div className={`text-4xl ${socketConnected ? "text-green-500" : "text-red-500"}`}>
              {socketConnected ? "Active" : "Inactive"}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-lg font-bold">Total Notification</div>
            <div className="text-4xl text-red-500">{totalNotifications}</div>
          </div>
        </div>
      </main>

      {panelOpen && (
        <div
          className="absolute z-50"
          style={{
            top: `${panelPosition.top}px`,
            right: `${panelPosition.right}px`,
          }}
        >
          <NotificationPanel
            notifications={notifications}
            setNotifications={setNotifications}
            setPanelOpen={setPanelOpen}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
