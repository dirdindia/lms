import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Main App Component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
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
