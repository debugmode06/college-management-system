import { FaBookOpen, FaRegCheckCircle } from "react-icons/fa";
import { FiClock, FiDownload, FiMessageCircle } from "react-icons/fi";
import { MdWarningAmber } from "react-icons/md";

export default function Arrears() {
  const arrears = [
    {
      code: "CS 301",
      name: "Data Structures",
      status: "Pending",
      examDate: "Dec 14, 2025",
      faculty: "Dr. Pravin S.",
    },
    {
      code: "CS 405",
      name: "Machine Learning",
      status: "Registered",
      examDate: "Dec 20, 2025",
      faculty: "Dr. Kavya R.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        fontFamily: "Inter,sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "95%",
          maxWidth: "1300px",
          margin: "36px auto 0 auto",
          background: "linear-gradient(90deg,#5B48FF 10%,#6366F1 90%)",
          borderRadius: "22px",
          color: "#fff",
          boxShadow: "0 4px 28px #5B48FF24",
          display: "flex",
          alignItems: "center",
          padding: "30px 44px",
          gap: "20px",
        }}
      >
        <MdWarningAmber size={40} style={{marginRight:"17px"}} />
        <div style={{flex:1}}>
          <div style={{fontSize:"2.1rem",fontWeight:800}}>Arrear Subjects</div>
          <div style={{fontSize:"1.1rem",marginTop:"6px"}}>View and manage all your backlog subjects in one place. Plan your success and clear your arrears!</div>
          <div style={{marginTop:"7px",fontSize:"1.01rem",opacity:0.97}}>
            <span style={{marginRight:"19px"}}>Track Status</span>
            <span style={{marginRight:"19px"}}>Priority Study Tools</span>
            <span>Faculty Support</span>
          </div>
        </div>
      </div>

      {/* Main Content Block */}
      <div style={{width:"95%",maxWidth:"1300px",padding:"0",margin:"34px auto 0 auto",display:"flex",gap:"38px",alignItems:"flex-start"}}>
        {/* Arrears List Card */}
        <div style={{
          flex:2,
          background:"#fff",
          borderRadius:"19px",
          boxShadow:"0 4px 20px #6366f124",
          padding: "29px 32px 24px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}>
          <div style={{fontSize:"1.21rem", fontWeight:800, marginBottom:"14px", color:"#38406b"}}>
            Your Active Arrears ({arrears.length})
          </div>
          {arrears.map((a, i) => (
            <div key={i} style={{
              background: "#f6f7fb",
              borderRadius: "13px",
              padding: "22px 26px",
              marginBottom: "0",
              display:"flex",
              alignItems:"center",
              boxShadow:"0 2px 14px #5b48ff13"
            }}>
              <FaBookOpen style={{color:"#5b48ff",fontSize:"25px",marginRight:"17px"}} />
              <div style={{flex:2}}>
                <div style={{fontWeight:"700",fontSize:"1.12rem",color:"#253059"}}>{a.name} <span style={{color:"#7c7e93",fontWeight:500,fontSize:"1rem",marginLeft:"13px"}}>({a.code})</span></div>
                <div style={{fontSize:"1rem",marginTop:"7px"}}>
                  <FiClock style={{verticalAlign:"middle",color:"#6366f1"}} /> 
                  <span style={{color:"#6366f1",marginLeft:"4px"}}>Exam Date:</span>
                  <span style={{marginLeft:"7px",color:"#253059",fontWeight:600}}>{a.examDate}</span>
                  <span style={{marginLeft:"24px",opacity:.72}}><FaRegCheckCircle size={15} color={a.status==="Pending"?"#f59e1e":"#22c55e"} style={{marginBottom:"-3px"}}/> {a.status}</span>
                  <span style={{marginLeft:"22px",color:"#4f46e5"}}>Faculty: {a.faculty}</span>
                </div>
              </div>
              <button
                style={{
                  background: "linear-gradient(90deg,#6366f1 33%,#4f46e5 100%)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1rem",
                  border: "none",
                  borderRadius: "14px",
                  padding: "12px 21px",
                  marginLeft: "18px",
                  cursor: "pointer",
                  boxShadow:"0 2px 15px #5b48ff2a"
                }}
              >
                Start Preparation
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar - Study Tools */}
        <aside style={{minWidth:"305px",flex:1,display:"flex",flexDirection:"column",gap:"25px"}}>
          <div style={{
            background:"#fff",
            borderRadius:"15px",
            boxShadow:"0 2px 11px #6366f124",
            padding:"25px 21px",
          }}>
            <div style={{fontWeight:700,fontSize:"1.13rem",marginBottom:"13px",color:"#283047"}}>Arrear Study Tools</div>
            <ul style={{listStyle:"none",padding:0,margin:0}}>
              <li style={{marginBottom:"13px",padding:"13px",background:"#eef2ff",borderRadius:"9px",display:"flex",alignItems:"center",gap:"12px"}}>
                <FiDownload size={21} color="#2563eb" /> Download Study Plan <span style={{marginLeft:"auto",color:"#7c7e93",fontSize:"0.97rem"}}>PDF/Excel</span>
              </li>
              <li style={{marginBottom:"13px",padding:"13px",background:"#e0fbea",borderRadius:"9px",display:"flex",alignItems:"center",gap:"12px"}}>
                <FiMessageCircle size={21} color="#22c55e" /> Faculty Chat <span style={{marginLeft:"auto",color:"#7c7e93",fontSize:"0.97rem"}}>Get support</span>
              </li>
              <li style={{marginBottom:"13px",padding:"13px",background:"#f3e8ff",borderRadius:"9px",display:"flex",alignItems:"center",gap:"12px"}}>
                <FaRegCheckCircle size={21} color="#7c3aed" /> Success Tips <span style={{marginLeft:"auto",color:"#7c7e93",fontSize:"0.97rem"}}>For your exams</span>
              </li>
            </ul>
          </div>
          <div style={{
            background:"#fff",
            borderRadius:"15px",
            boxShadow:"0 2px 11px #6366f124",
            padding:"23px 21px",
          }}>
            <div style={{fontWeight:700,fontSize:"1.13rem",marginBottom:"14px",color:"#283047"}}>Next Steps</div>
            <ul style={{listStyle:"none",padding:0,margin:0}}>
              <li style={{marginBottom:"13px",padding:"10px 14px",background:"#fef9c3",borderRadius:"8px",color:"#b45309"}}>Review syllabus and past papers</li>
              <li style={{marginBottom:"13px",padding:"10px 14px",background:"#fee2e2",borderRadius:"8px",color:"#b91c1c"}}>Request faculty guidance if needed</li>
              <li style={{marginBottom:"8px",padding:"10px 14px",background:"#bbf7d0",borderRadius:"8px",color:"#22c55e"}}>Set reminders for each exam</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
