import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        width: "100vw",
        fontFamily: "inherit",
        background: `linear-gradient(rgba(212, 200, 200, 0.56), rgba(200, 215, 250, 0.37)), url('/background.png') center/cover no-repeat`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Global style to guarantee no scrollbars */}
      <style>
        {`
          html, body, #root {
            height: 100vh !important;
            min-height: 100vh !important;
            overflow: hidden !important;
            width: 100vw !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `}
      </style>

      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "-10%",
        left: "-5%",
        width: "500px",
        height: "500px",
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))",
        borderRadius: "50%",
        filter: "blur(100px)",
        animation: "float 20s infinite ease-in-out"
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%",
        right: "-5%",
        width: "600px",
        height: "600px",
        background: "linear-gradient(135deg, rgba(240, 147, 251, 0.3), rgba(245, 87, 108, 0.3))",
        borderRadius: "50%",
        filter: "blur(120px)",
        animation: "float 25s infinite ease-in-out reverse"
      }} />

      {/* Navigation Bar */}
      <nav style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 50px",
        background: "rgba(50, 49, 49, 0.13)",
        backdropFilter: "blur(5px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <div style={{
            width: "45px",
            height: "45px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>🎓</div>
          <span style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#fff",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}>EduConnect Hub</span>
        </div>
        <div style={{
          display: "flex",
          gap: "20px",
          alignItems: "center"
        }}>
          <a href="#features" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "all 0.3s"
          }}>Features</a>
          <a href="#about" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem"
          }}>About</a>
          <a href="#contact" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem"
          }}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: "absolute",
        zIndex: 1,
        top: "70px",
        left: 0,
        width: "100%",
        height: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Main Heading */}
        <h1 style={{
          fontSize: "4rem",
          fontWeight: 900,
          color: "#fff",
          margin: 0,
          marginBottom: "20px",
          textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
          lineHeight: 1.2,
          maxWidth: "900px"
        }}>
          Welcome to <span style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>EduConnect</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "1.3rem",
          color: "rgba(255, 255, 255, 0.95)",
          maxWidth: "700px",
          margin: "0 auto 0 auto",
          lineHeight: 1.8,
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)"
        }}>
          Because success isn't just a goal, it's a daily experience here.<br />
          Each day brings fresh opportunities to learn, grow, and shine.<br />
          Join a vibrant community where your journey is celebrated every step of the way.
        </p>

        {/* Login Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          maxWidth: "700px",
          width: "100%",
          marginTop: "15px",
          alignItems: "center"
        }}>
          {/* Student Login Card */}
          <div
            onClick={() => navigate("/login/student")}
            style={{
              background: "rgba(255, 255, 255, 0.16)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "20px",
              padding: "24px 15px",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              position: "relative",
              overflow: "hidden",
              minWidth: 180,
              maxWidth: 220
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 20px 35px rgba(102, 126, 234, 0.19)";
              e.currentTarget.style.border = "2px solid rgba(102, 126, 234, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.border = "2px solid rgba(255, 255, 255, 0.3)";
            }}
          >
            <div style={{
              width: "46px",
              height: "46px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto",
              fontSize: "1.65rem",
              boxShadow: "0 7px 14px rgba(102, 126, 234, 0.21)"
            }}>
              🎓
            </div>
            <h3 style={{
              color: "#fff",
              fontSize: "1.18rem",
              fontWeight: 700,
              margin: "0 0 7px 0",
              textShadow: "2px 2px 4px rgba(0,0,0,0.17)"
            }}>Student Login</h3>
            <p style={{
              color: "rgba(255, 255, 255, 0.83)",
              fontSize: ".97rem",
              margin: 0,
              lineHeight: 1.35
            }}>
              Access your courses, assignments, and grades
            </p>
          </div>

          {/* Faculty Login Card */}
          <div
            onClick={() => navigate("/login/faculty")}
            style={{
              background: "rgba(255, 255, 255, 0.13)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.16)",
              borderRadius: "20px",
              padding: "24px 15px",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              minWidth: 180,
              maxWidth: 220
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 20px 35px rgba(240, 147, 251, 0.18)";
              e.currentTarget.style.border = "2px solid rgba(245, 87, 108, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.border = "2px solid rgba(255, 255, 255, 0.16)";
            }}
          >
            <div style={{
              width: "46px",
              height: "46px",
              background: "linear-gradient(135deg, #f093fb, #f5576c)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto",
              fontSize: "1.65rem",
              boxShadow: "0 7px 14px rgba(245, 87, 108, 0.22)"
            }}>
              👨‍🏫
            </div>
            <h3 style={{
              color: "#fff",
              fontSize: "1.18rem",
              fontWeight: 700,
              margin: "0 0 7px 0",
              textShadow: "2px 2px 4px rgba(0,0,0,0.17)"
            }}>Faculty Login</h3>
            <p style={{
              color: "rgba(255, 255, 255, 0.83)",
              fontSize: ".97rem",
              margin: 0,
              lineHeight: 1.35
            }}>
              Manage courses, track progress, and engage
            </p>
          </div>

          {/* Admin Login Card */}
          <div
            onClick={() => navigate("/login/admin")}
            style={{
              background: "rgba(255, 255, 255, 0.19)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.23)",
              borderRadius: "20px",
              padding: "24px 15px",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              minWidth: 180,
              maxWidth: 220
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 20px 39px rgba(250, 112, 154, 0.15)";
              e.currentTarget.style.border = "2px solid rgba(254, 225, 64, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.border = "2px solid rgba(255, 255, 255, 0.23)";
            }}
          >
            <div style={{
              width: "46px",
              height: "46px",
              background: "linear-gradient(135deg, #fa709a, #fee140)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto",
              fontSize: "1.65rem",
              boxShadow: "0 7px 14px rgba(250, 112, 154, 0.15)"
            }}>
              👨‍💼
            </div>
            <h3 style={{
              color: "#fff",
              fontSize: "1.18rem",
              fontWeight: 700,
              margin: "0 0 7px 0",
              textShadow: "2px 2px 4px rgba(0,0,0,0.13)"
            }}>Admin Login</h3>
            <p style={{
              color: "rgba(255, 255, 255, 0.83)",
              fontSize: ".97rem",
              margin: 0,
              lineHeight: 1.35
            }}>
              Control panel for system administration
            </p>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg);}
          33% { transform: translate(18px, -16px) rotate(8deg);}
          66% { transform: translate(-11px, 12px) rotate(-7deg);}
        }
      `}</style>
    </div>
  );
}
