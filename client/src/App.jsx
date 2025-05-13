import React, { useEffect, useState } from "react";
import NotificationPanel from "./components/NotificationPanel";
import { mockNotifications } from "./data/mockNotifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";

function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [panelPosition, setPanelPosition] = useState({ top: 0, right: 0 });

  // Simulate receiving mock notifications every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotification =
        mockNotifications[Math.floor(Math.random() * mockNotifications.length)];

      setNotifications((prev) => [randomNotification, ...prev]);

      toast(`${randomNotification.title}: ${randomNotification.message}`, {
        type: randomNotification.type,
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle notification panel toggle and position
  const handleNotification = (e) => {
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
          <div className="text-2xl font-bold text-gray-800">Dashboard</div>
          <div className="flex items-center space-x-4 relative">
            <button
              onClick={handleNotification}
              className="relative text-gray-800 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FaBell className="h-6 w-6" />
              {notifications.filter((notification) => !notification.read).length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mt-16 p-8 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-lg font-bold">Total Users</div>
            <div className="text-4xl">256</div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-lg font-bold">Server Status</div>
            <div className="text-4xl text-green-500">Active</div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-lg font-bold">Pending Alerts</div>
            <div className="text-4xl text-red-500">3</div>
          </div>
        </div>
      </main>

      {panelOpen && (
        <div
          className="absolute z-50"
          style={{ top: `${panelPosition.top}px`, right: `${panelPosition.right}px` }}
        >
          <NotificationPanel
            notifications={notifications}
            setNotifications={setNotifications} // Pass setNotifications to update notifications state
            setPanelOpen={setPanelOpen}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
