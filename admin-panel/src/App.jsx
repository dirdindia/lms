import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Courses from "./pages/Courses";
import LiveClasses from "./pages/LiveClasses";
import Assessments from "./pages/Assessments";
import Certificates from "./pages/Certificates";
import Users from "./pages/Users";
import RegistrationRequests from "./pages/RegistrationRequests";
import AITutor from "./pages/AITutor";
import Community from "./pages/Community";
import Helpdesk from "./pages/Helpdesk";
import Payments from "./pages/Payments";
import Marketing from "./pages/Marketing";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Analytics />} />
          <Route path="courses" element={<Courses />} />
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="users" element={<Users />} />
          <Route path="registration-requests" element={<RegistrationRequests />} />
          <Route path="ai-tutor" element={<AITutor />} />
          <Route path="community" element={<Community />} />
          <Route path="helpdesk" element={<Helpdesk />} />
          <Route path="payments" element={<Payments />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
