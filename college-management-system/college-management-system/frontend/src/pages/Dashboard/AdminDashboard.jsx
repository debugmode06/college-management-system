import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    activeSessions: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch admin stats from backend
    const token = localStorage.getItem("token");
    fetch('http://localhost:5000/api/admin/stats', {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setStats(data.stats || stats);
          setRecentActivities(data.activities || []);
        }
      })
      .catch(err => console.error("Stats fetch error:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      fontFamily: "inherit"
    }}>
      {/* Admin Navigation Bar */}
      <nav style={{
        background: "#fff",
        padding: "16px 40px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #fa709a, #fee140)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem"
          }}>👨‍💼</div>
          <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1f2127" }}>
            Admin Portal
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.background = "#ff7875"}
          onMouseLeave={(e) => e.target.style.background = "#ff4d4f"}
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div style={{ padding: "40px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#1f2127",
            margin: "0 0 8px 0"
          }}>
            Dashboard Overview
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.05rem", margin: 0 }}>
            Manage your institution from one centralized hub
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          marginBottom: "40px"
        }}>
          {/* Total Students */}
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "28px",
            borderRadius: "16px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
          }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>👨‍🎓</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "4px" }}>
              {stats.totalStudents || "1,234"}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9 }}>Total Students</div>
          </div>

          {/* Total Faculty */}
          <div style={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            padding: "28px",
            borderRadius: "16px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(240, 147, 251, 0.3)"
          }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>👨‍🏫</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "4px" }}>
              {stats.totalFaculty || "87"}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9 }}>Faculty Members</div>
          </div>

          {/* Total Courses */}
          <div style={{
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            padding: "28px",
            borderRadius: "16px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(250, 112, 154, 0.3)"
          }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>📚</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "4px" }}>
              {stats.totalCourses || "145"}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9 }}>Active Courses</div>
          </div>

          {/* Active Sessions */}
          <div style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            padding: "28px",
            borderRadius: "16px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(79, 172, 254, 0.3)"
          }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>⚡</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "4px" }}>
              {stats.activeSessions || "342"}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9 }}>Active Sessions</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: "4px"
        }}>
          {["overview", "students", "faculty", "courses", "settings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 24px",
                background: activeTab === tab ? "linear-gradient(135deg, #fa709a, #fee140)" : "transparent",
                color: activeTab === tab ? "#fff" : "#6b7280",
                border: "none",
                borderRadius: "8px 8px 0 0",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
                textTransform: "capitalize"
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          minHeight: "400px"
        }}>
          {activeTab === "overview" && (
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "24px", color: "#1f2127" }}>
                Recent Activities
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { icon: "✅", action: "New student registered", user: "John Doe", time: "2 mins ago", color: "#10b981" },
                  { icon: "📝", action: "Assignment submitted", user: "Jane Smith", time: "15 mins ago", color: "#3b82f6" },
                  { icon: "👨‍🏫", action: "Faculty added course", user: "Dr. Brown", time: "1 hour ago", color: "#f59e0b" },
                  { icon: "📊", action: "Grades updated", user: "Prof. Wilson", time: "2 hours ago", color: "#8b5cf6" },
                  { icon: "🎓", action: "Student graduated", user: "Alice Johnson", time: "3 hours ago", color: "#ec4899" }
                ].map((activity, index) => (
                  <div key={index} style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                    background: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div style={{
                      width: "50px",
                      height: "50px",
                      background: `${activity.color}20`,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      marginRight: "16px"
                    }}>
                      {activity.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "#1f2127", marginBottom: "4px" }}>
                        {activity.action}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                        by {activity.user}
                      </div>
                    </div>
                    <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px"
              }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: 0, color: "#1f2127" }}>
                  Student Management
                </h2>
                <button style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                }}>
                  + Add Student
                </button>
              </div>
              <div style={{
                padding: "40px",
                textAlign: "center",
                color: "#6b7280"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>👨‍🎓</div>
                <p style={{ fontSize: "1.1rem" }}>Student management interface coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === "faculty" && (
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px"
              }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: 0, color: "#1f2127" }}>
                  Faculty Management
                </h2>
                <button style={{
                  background: "linear-gradient(135deg, #f093fb, #f5576c)",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(240, 147, 251, 0.3)"
                }}>
                  + Add Faculty
                </button>
              </div>
              <div style={{
                padding: "40px",
                textAlign: "center",
                color: "#6b7280"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>👨‍🏫</div>
                <p style={{ fontSize: "1.1rem" }}>Faculty management interface coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px"
              }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: 0, color: "#1f2127" }}>
                  Course Management
                </h2>
                <button style={{
                  background: "linear-gradient(135deg, #fa709a, #fee140)",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(250, 112, 154, 0.3)"
                }}>
                  + Add Course
                </button>
              </div>
              <div style={{
                padding: "40px",
                textAlign: "center",
                color: "#6b7280"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📚</div>
                <p style={{ fontSize: "1.1rem" }}>Course management interface coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "24px", color: "#1f2127" }}>
                System Settings
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { icon: "🔔", title: "Notifications", desc: "Manage system notifications and alerts" },
                  { icon: "🔐", title: "Security", desc: "Configure security and authentication settings" },
                  { icon: "📧", title: "Email Templates", desc: "Customize email templates for communications" },
                  { icon: "🎨", title: "Appearance", desc: "Customize portal theme and branding" },
                  { icon: "🗄️", title: "Database", desc: "Manage database backups and maintenance" }
                ].map((setting, index) => (
                  <div key={index} style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    background: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                  >
                    <div style={{
                      fontSize: "2rem",
                      marginRight: "20px"
                    }}>
                      {setting.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1f2127", marginBottom: "4px" }}>
                        {setting.title}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                        {setting.desc}
                      </div>
                    </div>
                    <div style={{ fontSize: "1.5rem", color: "#9ca3af" }}>›</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
