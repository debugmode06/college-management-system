import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { FiSend, FiPaperclip, FiMic } from "react-icons/fi";
import { BsBook } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { MdAnalytics, MdOutlineSchedule } from "react-icons/md";

export default function StudentAi() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // Load messages from localStorage initially
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("studentAiMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studentAiMessages", JSON.stringify(messages));
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const userInput = input;
    setInput("");
    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: userInput,
      });
      const reply = res.data.reply;
      if (reply.startsWith("NAVIGATE:")) {
        navigate(reply.replace("NAVIGATE:", "").trim());
        return;
      }
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ AI server error. Try again." },
      ]);
    }
  }

  // Dummy default conversation for demo
  const defaultMessages = [
    { from: "bot", text: "Hello Alex! 👋 I'm your AI assistant. I can help you with assignments, study planning, course questions, and much more. What would you like to know today?" },
    { from: "user", text: "Can you help me understand the difference between binary search trees and AVL trees for my Data Structures assignment?" },
    { from: "bot", text: "Great question! Let me break down the key differences:" },
  ];
  const renderedMessages = messages.length === 0 ? defaultMessages : messages;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f8fa",
      fontFamily: "Inter,sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Top Banner */}
      <div style={{
        width: "95%",
        maxWidth: "1500px",
        margin: "36px auto 0 auto",
        display: "flex",
        alignItems: "center",
        gap: "30px",
        borderRadius: "28px",
        background: "linear-gradient(90deg, #5B48FF 8%, #6366F1 80%)",
        color: "#fff",
        boxShadow: "0 4px 32px #6366f144"
      }}>
        <FaRobot size={44} style={{margin: "42px"}} />
        <div style={{flex: '1'}}>
          <div style={{fontSize:"2.28rem",fontWeight:800}}>AI Assistant</div>
          <div style={{fontSize:"1.1rem", marginTop:"7px"}}>Your intelligent academic companion, available 24/7</div>
          <div style={{marginTop:"11px", fontSize:"1.02rem", opacity: 0.98}}>
            <span style={{marginRight:"19px"}}>Online &amp; Ready</span>
            <span style={{marginRight:"19px"}}>Multilingual Support</span>
            <span>Smart Learning</span>
          </div>
        </div>
        <div style={{paddingRight:"38px"}}>
          <FaRobot size={28} color="#fff" style={{background:"#a78bfa",borderRadius:"50%",padding:"6px"}}/>
        </div>
      </div>

      {/* Page Layout */}
      <div style={{display:"flex",width:"95%",maxWidth:"1500px",margin:"45px auto",gap:"45px",alignItems:"flex-start"}}>

        {/* Chat Card */}
        <div style={{
          flex: "2",
          background: "#fff",
          borderRadius: "19px",
          boxShadow: "0 4px 22px #6366f124",
          display: "flex",
          flexDirection: "column",
          minHeight: "520px"
        }}>
          {/* Chat Card Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "21px 34px 12px 34px",
            fontWeight: 700,
            color: "#4f46e5",
            fontSize: "1.18rem",
          }}>
            <FaRobot size={25} style={{background:"#a78bfa",borderRadius:"50%",marginRight:"10px",padding:"4px"}} />
            EduBot Assistant
            <span style={{
              background: "#34d399",
              color: "#065f46",
              borderRadius: "11px",
              padding: "5px 16px",
              marginLeft: "14px",
              fontWeight: "600",
              fontSize: "1.07rem"
            }}>Online</span>
          </div>
          {/* Chat Threads */}
          <div style={{
            flex: 1,
            padding: "14px 34px 10px 34px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            background:"#f6f7fb"
          }}>
            {renderedMessages.map((msg, index) => (
              <div key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-start"
                }}>
                <div style={{
                  maxWidth: "82%",
                  padding: "15px 21px",
                  borderRadius: msg.from === "user" ? "23px 23px 11px 23px" : "23px 23px 23px 11px",
                  background: msg.from === "user" ? "linear-gradient(90deg, #6366F1 55%, #4f46e5 100%)" : "#fff",
                  color: msg.from === "user" ? "#fff" : "#23243a",
                  fontSize: "1.09rem",
                  lineHeight: "1.48",
                  fontWeight: msg.from === "user" ? "600" : "500",
                  boxShadow: msg.from === "user"
                    ? "0 2px 13px #6366f143"
                    : "0 2px 15px #e0e7ff85"
                }}>{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Row */}
          <div style={{
            padding: "19px 34px 15px 34px",
            background: "#fff",
            borderTop: "1.5px solid #e5e7eb",
            borderRadius: "0 0 19px 19px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"13px"}}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask me anything about your studies, assignments, or academic planning…"
                style={{
                  flex: 1,
                  padding: "15px 18px",
                  fontSize: "1.08rem",
                  borderRadius: "13px",
                  border: "1.5px solid #e5e7eb",
                  background: "#f9fafe",
                  outline: "none",
                  fontWeight: 500,
                  fontFamily: "inherit"
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  padding: "10px 25px",
                  borderRadius: "13px",
                  background: "linear-gradient(90deg,#6366f1 33%,#4f46e5 100%)",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "20px",
                  border: "none",
                  boxShadow: "0 2px 16px #6366f13a",
                  cursor:"pointer"
                }}
              >
                <FiSend size={24} />
              </button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"18px",paddingLeft:"2px",color:"#7c7e93",fontSize:"1rem"}}>
              <FiPaperclip size={19} /> Attach
              <FiMic size={19} /> Voice
              <span style={{marginLeft:"auto",opacity:0.7,fontSize:"0.99rem"}}>
                Press Enter to send, Shift+Enter for new line
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{
          minWidth:"360px",
          maxWidth:"420px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "27px"
        }}>
          {/* Quick Actions */}
          <div style={{
            background: "#fff",
            borderRadius: "17px",
            boxShadow: "0 2px 12px #5B48FF18",
            padding: "23px 27px 15px 24px",
            marginBottom: "17px"
          }}>
            <div style={{fontWeight:700,fontSize:"1.13rem",marginBottom:"14px",color:"#283047"}}>Quick Actions</div>
            <ul style={{listStyle:"none",margin:0,padding:0}}>
              <li style={{padding:"10px 0",display:"flex",alignItems:"center",gap:"13px",background:"#eef2ff",borderRadius:"8px",marginBottom:"10px"}}>
                <BiTask size={22} color="#2563eb" /> Assignment Help <span style={{color:"#6b7280",fontSize:"0.99rem",marginLeft:"auto"}}>Get help with homework</span>
              </li>
              <li style={{padding:"10px 0",display:"flex",alignItems:"center",gap:"13px",background:"#f3e8ff",borderRadius:"8px",marginBottom:"10px"}}>
                <MdOutlineSchedule size={22} color="#7c3aed" /> Study Planning <span style={{color:"#6b7280",fontSize:"0.99rem",marginLeft:"auto"}}>Create study schedules</span>
              </li>
              <li style={{padding:"10px 0",display:"flex",alignItems:"center",gap:"13px",background:"#e0fbea",borderRadius:"8px",marginBottom:"10px"}}>
                <MdAnalytics size={22} color="#22c55e" /> Grade Analysis <span style={{color:"#6b7280",fontSize:"0.99rem",marginLeft:"auto"}}>Understand performance</span>
              </li>
              <li style={{padding:"10px 0",display:"flex",alignItems:"center",gap:"13px",background:"#fef9c3",borderRadius:"8px",marginBottom:"8px"}}>
                <BsBook size={22} color="#eab308" /> Deadline Reminders <span style={{color:"#6b7280",fontSize:"0.99rem",marginLeft:"auto"}}>Never miss due dates</span>
              </li>
            </ul>
          </div>
          {/* Recent Conversations */}
          <div style={{
            background: "#fff",
            borderRadius: "17px",
            boxShadow: "0 2px 10px #5B48FF15",
            padding: "21px 27px 14px 24px"
          }}>
            <div style={{fontWeight:700,fontSize:"1.13rem",marginBottom:"14px",color:"#283047"}}>Recent Conversations</div>
            <div style={{
              fontSize:"1.05rem",
              padding:"8px 0 7px 7px",
              background:"#eef2ff",
              borderRadius:"8px",
              marginBottom:"11px",
              color:"#1e3a8a"
            }}>Data Structures Help <span style={{color:"#8b88b8",fontSize:"0.98rem",marginLeft:"8px"}}>Binary trees vs AVL trees...</span></div>
            <div style={{
              fontSize:"1.05rem",
              padding:"8px 0 7px 7px",
              background:"#f3e8ff",
              borderRadius:"8px",
              marginBottom:"3px",
              color:"#7c3aed",
            }}>Study Schedule <span style={{color:"#8b88b8",fontSize:"0.98rem",marginLeft:"8px"}}>Machine learning exam prep...</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
