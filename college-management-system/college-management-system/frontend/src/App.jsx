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
import AdminGradesUpload from './pages/AdminGradesUpload';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/login/faculty" element={<FacultyLogin />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admin/upload-grades" element={<AdminGradesUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
