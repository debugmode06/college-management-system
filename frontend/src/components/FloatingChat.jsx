import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export default function FloatingChat() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(e) {
      if (buttonRef.current?.contains(e.target)) return;
      if (chatRef.current?.contains(e.target)) return;
      setIsOpen(false);
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", { message: text });
      setMessages((prev) => [...prev, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { from: "bot", text: "❌ AI server error" }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Only hide floating chat on AI page
  if (location.pathname === "/student/ai") return null;

  return (
    <>
      {/* Floating Button */}
      <div
        ref={buttonRef}
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "66px",
          height: "66px",
          background: "linear-gradient(90deg, #5B48FF 60%, #6366F1 100%)",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 18px #6B70F099",
          zIndex: 9999,
          transition: "all 0.3s",
          transform: isOpen ? "scale(0.82)" : "scale(1)",
          border: isOpen ? "2px solid #e0e7ff" : "none",
        }}
      >
        <FaRobot size={32} color="white" />
      </div>

      {/* Chat Popup */}
      <div
        ref={chatRef}
        style={{
          position: "fixed",
          bottom: "115px",
          right: "32px",
          width: "340px",
          height: "470px",
          background: "white",
          borderRadius: "18px",
          boxShadow: "0 8px 38px #6366F135",
          display: "flex",
          flexDirection: "column",
          zIndex: 9999,
          transform: isOpen ? "translateY(0)" : "translateY(25px)",
          opacity: isOpen ? 1 : 0,
          transition: "all 0.23s cubic-bezier(.52,.04,.17,1)",
          pointerEvents: isOpen ? "all" : "none"
        }}
      >
        {/* Top Gradient Header */}
        <div
          style={{
            padding: "15px",
            background: "linear-gradient(90deg, #5B48FF 8%, #6366F1 80%)",
            color: "white",
            borderRadius: "18px 18px 0 0",
            fontWeight: "bold",
            fontSize: "1.08rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaRobot size={22} style={{marginRight:"8px",background:"#a78bfa",borderRadius:"50%",padding:"2px"}} />
          <span>AI Assistant</span>
          <span style={{
            marginLeft: "auto",
            fontSize: "0.98rem",
            background: "#34d399",
            color: "#065f46",
            borderRadius: "10px",
            padding: "4px 13px",
            fontWeight: "600"
          }}>Online</span>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: "16px 14px",
            overflowY: "auto",
            background: "#f7f9fa",
            borderRadius: "0 0 18px 18px",
          }}
        >
          {messages.length === 0 && (
            <div style={{
              color: "#555",
              background: "#eef2ff",
              padding: "10px 12px",
              borderRadius: "13px",
              fontSize: "0.98rem",
            }}>
              👋 Hi there! I’m your academic assistant. Ask me anything about assignments, study help, or planning.
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                margin: "10px 0"
              }}
            >
              <span
                style={{
                  padding: "11px 14px",
                  background: msg.from === "user"
                    ? "linear-gradient(90deg, #6366f1 60%, #4f46e5 100%)"
                    : "#fff",
                  color: msg.from === "user" ? "white" : "#444",
                  borderRadius: msg.from === "user"
                    ? "17px 17px 5px 17px"
                    : "17px 17px 17px 5px",
                  fontSize: "1.05rem",
                  boxShadow: msg.from === "user"
                    ? "0 2px 8px #4f46e529"
                    : "0 2px 7px #e0e7ff91",
                  fontWeight: msg.from === "user" ? 600 : 500,
                  maxWidth: "84%",
                  wordBreak: "break-word"
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input Row */}
        <div
          style={{
            display: "flex",
            padding: "13px 15px",
            background: "white",
            borderTop: "1px solid #e0e7ff",
            borderRadius: "0 0 18px 18px",
            boxShadow: "0 -1.5px 7px #6366f10a"
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "14px",
              border: "1.3px solid #e0e7ff",
              fontSize: "1rem",
              background: "#f7f9ff",
              outline: "none"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "9px",
              background: "linear-gradient(90deg,#5B48FF70,#6366F1)",
              border: "none",
              padding: "8px 18px",
              borderRadius: "14px",
              color: "white",
              fontWeight: 700,
              fontSize: "1.04rem",
              cursor: "pointer",
              boxShadow: "0 2px 14px #6366f13a"
            }}
          >
            <FiSend size={22} />
          </button>
        </div>
      </div>
    </>
  );
}
