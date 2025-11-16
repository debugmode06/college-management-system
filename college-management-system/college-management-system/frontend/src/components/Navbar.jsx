import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ContactIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="#b4bac8"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        borderRadius: "50%",
        background: "#e6e8ef",
        padding: "3px",
        cursor: "pointer"
      }}
    >
      <circle cx="12" cy="8" r="4" />
      <rect x="4" y="16" width="16" height="4" rx="2" />
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", has_arrears: false });

  const navLinks = [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Workspace", to: "/student/workspace" },
    { label: "Assessments", to: "/student/assessments" },
    { label: "AI Assistant", to: "/student/ai" },
    { label: "Analytics", to: "/student/analytics" },
    { label: "Arrears", to: "/student/arrears" }  // Always visible
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('http://localhost:5000/api/profile', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          console.log("📊 Profile data:", data);
          console.log("⚠️ Has arrears:", data.has_arrears);
          if (!data.error) setProfile(data);
        })
        .catch(err => console.error("❌ Profile fetch error:", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const HIDE_ON_PATHS = ["/", "/login/student", "/login/faculty", "/login/admin"];
  if (HIDE_ON_PATHS.includes(location.pathname)) return null;

  return (
    <>
      {/* Add spacing container */}
      <div style={{ 
        padding: '10px 14px 10px 14px',
      
      }}>
        <nav style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f9f7f7ff",
          padding: "5px 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          borderRadius: "12px",
          minHeight: "56px"
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.48rem"
          }}>
            <span style={{ fontWeight: 750, fontSize: "1rem", color: "#174fd6", letterSpacing: "-1px" }}>
              <span style={{
                display:"inline-block",
                width:"19px", height:"19px", background:"#f4f6ff",
                borderRadius:"50%", verticalAlign:"middle", textAlign:"center", fontSize:"0.83rem", marginRight:7
              }}>🛡️</span>
              EduConnect Hub
            </span>
          </div>

          {/* Center nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontWeight: 600,
                  fontSize: "0.90rem",
                  color: location.pathname === link.to ? "#174fd6" : "#75829e",
                  background: location.pathname === link.to ? "#eaf1ff" : "none",
                  padding: "6px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "background .15s"
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Download icon, profile link, and logout button */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{
              fontSize: "1.01rem",
              color: "#174fd6",
              height: "19px",
              display: "inline-flex",
              alignItems: "center"
            }}>⬇️</span>
            
            <Link to="/student/profile" style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: "0.3rem"
            }}>
              <ContactIcon />
           <span style={{
  fontWeight: 600,
  fontSize: "0.90rem",
  color: "#75829e",
  padding:" 0 10px"
}}>{profile.name}</span>

            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "7px 14px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "#ff7875"}
              onMouseLeave={(e) => e.target.style.background = "#ff4d4f"}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
