import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherLayout from "./components/layout/TeacherLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses";
import Schedule from "./pages/Schedule";
import Recordings from "./pages/Recordings";
import Mentorships from "./pages/Mentorships";
import Assignments from "./pages/Assignments";
import Students from "./pages/Students";
import Messages from "./pages/Messages";
import LiveSupport from "./pages/LiveSupport";
import Settings from "./pages/Settings";

// Main App Component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeacherLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="recordings" element={<Recordings />} />
          <Route path="mentorships" element={<Mentorships />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="students" element={<Students />} />
          <Route path="messages" element={<Messages />} />
          <Route path="live-support" element={<LiveSupport />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
