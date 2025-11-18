import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    fetch('http://localhost:5000/api/faculty/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/faculty/dashboard");
        } else {
          setError(data.error);
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Connection failed. Please try again.");
      });
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "inherit",
      background: `linear-gradient(rgba(212, 200, 200, 0.56), rgba(200, 215, 250, 0.37)), url('/background.png') center/cover no-repeat`,
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: "300px",
        height: "300px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        filter: "blur(80px)"
      }} />
      <div style={{
        position: "absolute",
        bottom: "15%",
        right: "15%",
        width: "250px",
        height: "250px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        filter: "blur(70px)"
      }} />

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        maxHeight: "550px",
        background: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(140, 135, 135, 0.73)",
        borderRadius: "24px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.39)",
        overflow: "hidden"
      }}>
        {/* Header Section */}
        <div style={{
          background: "linear-gradient(135deg, #f093fb2b 0%, #f5576c 100%)",
          padding: "20px 30px 20px 30px",
          textAlign: "center",
          position: "relative"
        }}>
          {/* Icon/Logo */}
          <div style={{
            width: "80px",
            height: "80px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            margin: "0 auto 20px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.3)"
          }}>
            <span style={{ fontSize: "2.5rem" }}>👨‍🏫</span>
          </div>
          
          <h2 style={{
            color: "#fff",
            margin: 0,
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: "8px"
          }}>
            Faculty Portal
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.9)",
            margin: 0,
            fontSize: "0.95rem",
            fontWeight: 400
          }}>
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} style={{
          padding: "40px"
        }}>
          {/* Email Input */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              marginBottom: "9px",
              color: "rgba(255, 255, 255, 1)",
              fontSize: "0.8rem",
              fontWeight: 600
            }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1.2rem",
                color: "#9ca3af"
              }}>✉️</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 48px",
                  borderRadius: "12px",
                  border: "2px solid #9394967c",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#f093fb"}
                onBlur={(e) => e.target.style.borderColor = "#9394967c"}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#ffffffff",
              fontSize: "0.9rem",
              fontWeight: 600
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1.2rem",
                color: "#9ca3af"
              }}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 44px",
                  borderRadius: "12px",
                  border: "2px solid #9394967c",
                  fontSize: "0.8rem",
                  transition: "all 0.3s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#f093fb"}
                onBlur={(e) => e.target.style.borderColor = "#9394967c"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: 0
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px"
          }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#f4f4f5ff"
            }}>
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Remember me
            </label>
            <a href="#" style={{
              color: "#ffffffff",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 600
            }}>
              Forgot Password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#9ca3afff" : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "#fff",
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              fontWeight: 700,
              fontSize: "1.05rem",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(245, 87, 108, 0.4)",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => !loading && (e.target.style.transform = "translateY(0)")}
          >
            {loading ? (
              <>
                <span style={{
                  width: "20px",
                  height: "20px",
                  border: "3px solid rgba(255,255,255,0.3)",
                  borderTop: "3px solid #fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite"
                }} />
                Logging in...
              </>
            ) : (
              <>
                Login
              </>
            )}
          </button>
        </form>
      </div>

      {/* Add spinning animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
