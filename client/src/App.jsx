import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotificationHistory from "./pages/NotificationHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notification-history" element={<NotificationHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
