import React, { useEffect, useState } from "react";

// Helper to get today's string (e.g. Thursday, October 30, 2025)
function getTodayString() {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date().toLocaleDateString(undefined, options);
}

export default function StudentDashboard() {
  const [profile, setProfile] = useState({ name: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('http://localhost:5000/api/profile', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (!data.error) setProfile(data);
        });
    }
  }, []);

  return (
    <div style={{
      maxWidth: 1200,
      margin: "32px auto",
      padding: "0 16px"
    }}>
      {/* Welcome Banner */}
      <section style={{
        background: "linear-gradient(90deg,#4666f6 50%,#8259e6 100%)",
        color: "#fff",
        borderRadius: 26,
        padding: "2rem 2.5rem 2rem 2.5rem",
        marginBottom: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        boxShadow: "0 4px 24px rgba(70,102,246,0.09)"
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "2.2rem", marginBottom: 8 }}>
            Welcome back, <span style={{ color: "#fff", fontWeight: 900 }}>{profile.name || "Student"}!</span>
          </div>
          <div style={{ fontSize: "1.22rem", marginBottom: 12 }}>
            Ready to continue your learning journey? Here's what's happening today.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 8, fontWeight: 500 }}>
            <span style={{ display: "flex", alignItems: "center", fontSize: "1.1rem" }}>
              📅 {getTodayString()}
            </span>
            <span>• <b>3 assignments due this week</b></span>
          </div>
        </div>
        {/* Circle checkmark or illustration (optional) */}
        <svg width="80" height="80" style={{position:"absolute",top:16,right:28,opacity:0.13}}>
          <circle cx="40" cy="40" r="38" stroke="#fff" strokeWidth="4" fill="none"/>
          <path d="M27 43l12 12 16-20" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </svg>
      </section>

      {/* Quick Actions */}
      <h2 style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: 16 }}>Quick Actions</h2>
      <div style={{
        display: "flex",
        gap: 24,
        marginBottom: 42,
        flexWrap: "wrap"
      }}>
        {[
          { label: "Submit Assignment", sub: "Upload your work", icon: "📄" },
          { label: "Study Materials", sub: "Access resources", icon: "📚" },
          { label: "AI Assistant", sub: "Get help instantly", icon: "💬" },
          { label: "View Progress", sub: "Track performance", icon: "📈" },
        ].map((a, i) => (
          <div key={i} style={{
            background: "#f4f6ff",
            padding: "1.15rem 1.1rem",
            borderRadius: 16,
            minWidth: 190,
            flex: "1 1 200px",
            maxWidth: 230,
            boxShadow: "0 3px 12px rgba(70,102,246,0.04)",
            transition: "box-shadow .13s",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{a.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>{a.label}</div>
            <div style={{ fontSize: "0.98rem", color: "#667", marginTop: 2 }}>{a.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Upcoming Assignments */}
        <section style={{
          flex: 2,
          background: "#fff",
          borderRadius: 15,
          boxShadow: "0 2px 11px rgba(70,102,246,0.06)",
          padding: "1.2rem 1.3rem 1.7rem 1.3rem",
          minWidth: 350
        }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.13rem", marginBottom: 16 }}>Upcoming Assignments</h3>
          {/* Example assignment card */}
          <div style={{
            background: "#ffeaea",
            borderRadius: 8,
            padding: "0.85rem",
            marginBottom: 10,
            borderLeft: "5px solid #f6656f"
          }}>
            <div style={{ fontWeight: 600 }}>Data Structures Final Project
              <span style={{
                background: "#ffcad1",
                color: "#f6656f",
                fontSize: "0.85em",
                borderRadius: 4,
                marginLeft: 13,
                padding: "2px 9px",
                verticalAlign: "middle"
              }}>URGENT</span>
            </div>
            <div style={{ color: "#656" }}>CS 301 • Due Tomorrow</div>
          </div>
        </section>
        {/* AI Insights */}
        <section style={{
          flex: 1.5,
          background: "#f7f9ff",
          borderRadius: 15,
          boxShadow: "0 2px 11px rgba(70,102,246,0.03)",
          padding: "1.2rem 1.3rem",
          minWidth: 270
        }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.13rem", marginBottom: 12 }}>AI Insights</h3>
          <div style={{
            background: "#fff",
            borderRadius: 7,
            padding: "0.9rem 0.85rem",
            borderLeft: "4px solid #8259e6"
          }}>
            <div style={{
              fontWeight: 600,
              color: "#8259e6",
              marginBottom: 7
            }}>Study Recommendation</div>
            <div style={{ color: "#555", fontSize: "0.98rem" }}>
              Focus on graph algorithms for your upcoming CS 301 exam. You’ve shown strong performance in tree structures.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
