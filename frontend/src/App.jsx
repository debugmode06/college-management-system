import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/Landing/LandingPage";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import FacultyDashboard from "./pages/Dashboard/FacultyDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import StudentLogin from "./pages/Login/StudentLogin";
import FacultyLogin from "./pages/Login/FacultyLogin";
import AdminLogin from "./pages/Login/AdminLogin";
import StudentProfile from "./pages/StudentProfile";
import AdminGradesUpload from "./pages/AdminGradesUpload";
import StudentAi from "./pages/StudentAi";
import FloatingChat from "./components/FloatingChat";
import Workspace from "./components/Workspace";
import Assessment from "./components/Assessment";
import Analytics from "./components/Analytics";
import Arrears from "./components/Arrears"; // <-- ADDED

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />

        {/* STUDENT */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/ai" element={<StudentAi />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/student/workspace" element={<Workspace />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/student/assessments" element={<Assessment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/student/analytics" element={<Analytics />} />
        <Route path="/arrears" element={<Arrears />} />            {/* <-- ADDED */}
        <Route path="/student/arrears" element={<Arrears />} />    {/* <-- ADDED */}

        {/* FACULTY */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/login/faculty" element={<FacultyLogin />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admin/upload-grades" element={<AdminGradesUpload />} />
      </Routes>
      <FloatingChat />
    </BrowserRouter>
  );
}

export default App;
