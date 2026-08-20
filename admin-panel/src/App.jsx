import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import { ToastProvider } from "./context/ToastContext";
import { ConfirmProvider } from "./context/ConfirmContext";

// Pages
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
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
import ContactInquiries from "./pages/ContactInquiries";

import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (user.role !== 'admin') {
      return <Navigate to="/login" replace />;
    }
  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="reports" element={<Analytics />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/add" element={<AddCourse />} />
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
            <Route path="contact-inquiries" element={<ContactInquiries />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ConfirmProvider>
    </ToastProvider>
  );
}

export default App;
