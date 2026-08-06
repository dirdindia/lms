import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLayout from "./components/layout/StudentLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import BrowseCourses from "./pages/BrowseCourses";
import MyCourses from "./pages/MyCourses";
import LiveClasses from "./pages/LiveClasses";
import Assessments from "./pages/Assessments";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";
import Mentorship from "./pages/Mentorship";
import LiveMentors from "./pages/LiveMentors";
import AITutor from "./pages/AITutor";
import Support from "./pages/Support";

import Login from "./pages/Login";

// Main App Component

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (user.role !== 'student') {
      return <Navigate to="/login" replace />;
    }
  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="browse-courses" element={<BrowseCourses />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="live-mentors" element={<LiveMentors />} />
          <Route path="mentorship" element={<Mentorship />} />
          <Route path="ai-tutor" element={<AITutor />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
