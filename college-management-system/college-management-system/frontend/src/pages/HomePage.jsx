import React from "react";

export default function HomePage() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "2rem" }}>
      <div style={{
        background: "linear-gradient(90deg,#4666f6 60%,#8259e6 100%)",
        color: "#fff",
        padding: "2rem 3rem",
        borderRadius: "22px",
        marginBottom: "2rem",
        fontWeight: "bold",
        fontSize: "2rem"
      }}>
        Welcome back, [Student Name]!<br />
        <span style={{ fontWeight: "normal", fontSize: "1.2rem" }}>
          Ready to continue your learning journey? Here's what's happening today.
        </span>
        <div style={{ marginTop: "1rem", fontSize: "1rem" }}>
          📅 {new Date().toLocaleDateString()} &nbsp; | &nbsp; <b>3 assignments due this week</b>
        </div>
      </div>

      <h2>Quick Actions</h2>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ background: "#f4f6ff", padding: "1rem", borderRadius: 12, flex: 1 }}>
          <div style={{ fontSize: "1.5rem" }}>📄</div>
          <h4>Submit Assignment</h4>
        </div>
        <div style={{ background: "#f4f6ff", padding: "1rem", borderRadius: 12, flex: 1 }}>
          <div style={{ fontSize: "1.5rem" }}>📚</div>
          <h4>Study Materials</h4>
        </div>
        <div style={{ background: "#f4f6ff", padding: "1rem", borderRadius: 12, flex: 1 }}>
          <div style={{ fontSize: "1.5rem" }}>🤖</div>
          <h4>AI Assistant</h4>
        </div>
        <div style={{ background: "#f4f6ff", padding: "1rem", borderRadius: 12, flex: 1 }}>
          <div style={{ fontSize: "1.5rem" }}>📈</div>
          <h4>View Progress</h4>
        </div>
      </div>
    </div>
  );
}
