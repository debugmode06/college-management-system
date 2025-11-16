import React, { useEffect, useState } from "react";

function DocumentRow({ icon, name, meta, status, statusColor }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "14px 18px",
      borderRadius: 11,
      background: "#f3f4f6",
      marginBottom: 10,
    }}>
      <span style={{ fontSize: 22, marginRight: 17 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700 }}>{name}</div>
        <div style={{ color: "#64748b", fontWeight: 400, fontSize: ".97rem" }}>{meta}</div>
      </div>
      <span style={{
        background: "#f3f4f6",
        color: statusColor,
        border: `2px solid ${statusColor}`,
        fontWeight: 700,
        borderRadius: 11,
        padding: "2.5px 15px",
        fontSize: ".99rem",
        marginLeft: 14
      }}>{status}</span>
      <span role="img" aria-label="view" style={{fontSize:22, marginLeft:13, cursor:"pointer"}}>📄</span>
    </div>
  );
}

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // OCR upload states
  const [marksheetFile, setMarksheetFile] = useState(null);
  const [ocrDetails, setOcrDetails] = useState(null);
  const [ocrLoading, setOcrLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data && !data.error ? data : {});
        setLoading(false);
      })
      .catch(() => {
        setProfile({});
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f9fafb" }}>
        <h1 style={{ color: "#6366f1", fontWeight: 900, fontSize: "2.5rem" }}>Loading Profile...</h1>
      </div>
    );

  const v = (x) => x ? x : <span style={{ color: "#aaa" }}>–</span>;

  // Marksheet upload handler
  const handleMarksheetUpload = async (e) => {
    e.preventDefault();
    if (!marksheetFile) return;
    setOcrLoading(true);
    const formData = new FormData();
    formData.append("marksheet", marksheetFile);
    const res = await fetch("http://localhost:5000/api/ocr-marksheet", {
      method: "POST", body: formData
    });
    const data = await res.json();
    setOcrDetails(data);
    setOcrLoading(false);
  };

  return (
    <div style={{ padding: "36px 0", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 28px" }}>
        {/* Profile Title */}
        <h1 style={{ fontWeight: 800, fontSize: "2.25rem", marginBottom: 5 }}>Profile Management</h1>
        <div style={{ color: "#64748b", marginBottom: 36 }}>Manage your academic identity, documents, and security settings</div>
        {/* Main two-column layout */}
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
          {/* Left Panel (Profile Card) */}
          <div style={{
            background: "#fff", borderRadius: 18,
            boxShadow: "0 2px 12px #e5e7eb33", minWidth: 370,
            padding: "38px 28px 34px 28px", textAlign: "center"
          }}>
            <img src="" alt="Profile" style={{
              border: "4px solid #fff", borderRadius: "50%",
              height: 94, width: 94, objectFit: "cover", margin: "0 auto", marginBottom: 14, boxShadow: "0px 1px 10px #80808013"
            }} />
            <div style={{ fontWeight: 800, fontSize: "1.35rem", marginBottom: 4 }}>{v(profile.name)}</div>
            <div style={{ color: "#64748b" }}>{v(profile.branch) || "Computer Science Major"}</div>
            <div style={{
              margin: "29px auto 8px", padding: "16px 0", borderRadius: 11,
              background: "#f3f4f6", width: "90%", fontWeight: 700
            }}>
              <div>Student ID</div>
              <div style={{ color: "#2563eb", fontWeight: 800, fontSize: "1.08rem", letterSpacing: ".8px", marginTop: 2 }}>
                {v(profile.student_id)}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 11, color: "#334155", fontSize: "1rem" }}>
              <span>
                Enrollment<br />
                <span style={{ color: "#22c55e", fontWeight: 700 }}>Active</span>
              </span>
              <span>
                Year<br />
                <span style={{ fontWeight: 700 }}>{v(profile.year)}</span>
              </span>
            </div>
          </div>
          {/* Right Column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 33 }}>
            {/* Top Row: Personal Info */}
            <div style={{ display: "flex", gap: 26 }}>
              <div style={{
                background: "#fff", borderRadius: 15, boxShadow: "0 2px 10px #e5e7eb18",
                flex: 2, padding: "29px 32px"
              }}>
                <div style={{ fontWeight: 800, fontSize: "1.20rem", marginBottom: 19 }}>Personal Information</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "25px 3%", fontSize: 16 }}>
                  <div style={{ flex: 1, minWidth: 170 }}>
                    <div style={{ color: "#64748b", fontWeight: 500, marginBottom: 4 }}>Full Name</div>
                    <div style={{
                      background: "#f1f5f9", padding: "9px 12px", borderRadius: 7, fontWeight: 600, color: "#475569", minWidth: 130
                    }}>{v(profile.name)}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 170 }}>
                    <div style={{ color: "#64748b", fontWeight: 500, marginBottom: 4 }}>Email Address</div>
                    <div style={{
                      background: "#f1f5f9", padding: "9px 12px", borderRadius: 7, fontWeight: 600, color: "#475569"
                    }}>{v(profile.email)}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 170 }}>
                    <div style={{ color: "#64748b", fontWeight: 500, marginBottom: 4 }}>Phone Number</div>
                    <div style={{
                      background: "#f1f5f9", padding: "9px 12px", borderRadius: 7, fontWeight: 600, color: "#475569"
                    }}>{v(profile.phone)}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 170 }}>
                    <div style={{ color: "#64748b", fontWeight: 500, marginBottom: 4 }}>Date of Birth</div>
                    <div style={{
                      background: "#f1f5f9", padding: "9px 12px", borderRadius: 7, fontWeight: 600, color: "#475569"
                    }}>{v(profile.dob)}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 170 }}>
                    <div style={{ color: "#64748b", fontWeight: 500, marginBottom: 4 }}>Emergency Contact</div>
                    <div style={{
                      background: "#f1f5f9", padding: "9px 12px", borderRadius: 7, fontWeight: 600, color: "#475569"
                    }}>{v(profile.emergency)}</div>
                  </div>
                  <div style={{ flex: 2, minWidth: 240 }}>
                    <div style={{ color: "#64748b", fontWeight: 500, marginBottom: 4 }}>Address</div>
                    <div style={{
                      background: "#f1f5f9", padding: "9px 12px", borderRadius: 7, fontWeight: 600, color: "#475569"
                    }}>{v(profile.address)}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Second row: Document Storage section matching design */}
            <div style={{
              background: "#fff", borderRadius: 18, boxShadow: "0 2px 18px #e5e7eb19", padding: 32, maxWidth: 640
            }}>
              <div style={{
                fontWeight: 800,
                fontSize: "1.22rem",
                marginBottom: 19,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                Document Storage
                <form onSubmit={handleMarksheetUpload} style={{ margin: 0, display: "inline-block" }}>
                  <label htmlFor="marksheet-upload"
                         style={{
                           background: "#2563eb",
                           color: "#fff",
                           fontWeight: 700,
                           fontSize: "1rem",
                           padding: "10px 23px",
                           borderRadius: 8,
                           cursor: "pointer",
                           boxShadow: "0px 2px 6px #2563eb13",
                           letterSpacing: ".01em"
                         }}>
                    <span style={{ marginRight: 8, fontSize: 17 }} role="img" aria-label="upload">⤓</span>
                    Upload Document
                    <input
                      id="marksheet-upload"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={e => setMarksheetFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </label>
                  <button type="submit" disabled={ocrLoading || !marksheetFile} style={{ display: "none" }} />
                </form>
              </div>
              {/* Static Doc Demo Rows (replace with your list from DB if needed) */}
              <div>
                <DocumentRow
                  icon="📄"
                  name="Official Transcript"
                  meta="Updated Oct 25, 2025 • 2.4 MB"
                  status="VERIFIED"
                  statusColor="#22c55e"
                />
                <DocumentRow
                  icon="📘"
                  name="Recommendation Letter - Dr. Smith"
                  meta="Uploaded Sep 15, 2025 • 1.2 MB"
                  status="VERIFIED"
                  statusColor="#22c55e"
                />
                <DocumentRow
                  icon="🗂️"
                  name="Academic Portfolio"
                  meta="Updated Oct 20, 2025 • 15.7 MB"
                  status="PENDING"
                  statusColor="#eab308"
                />
              </div>
              {/* OCR Details -- Show when available */}
              {ocrDetails && (
                <div style={{
                  marginTop: 15, background: "#f8fafc", borderRadius: 12, padding: 14,
                  border: "1.5px solid #e5e7eb"
                }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#2563eb", marginBottom: 7 }}>
                    Marksheet Extraction Result
                  </div>
                  <div style={{ marginBottom: 2 }}><strong>Reg No:</strong> {ocrDetails.regNo}</div>
                  <div style={{ marginBottom: 2 }}><strong>EMIS ID:</strong> {ocrDetails.emisId}</div>
                  <div style={{ marginBottom: 8 }}><strong>CGPA:</strong> {ocrDetails.cgpa}</div>
                  {ocrDetails.arrears?.length > 0 ? (
                    <>
                      <h4 style={{ color: "#e74c3c", marginTop: 8, fontWeight: 700, fontSize: 16 }}>Arrears Detected</h4>
                      <table style={{ width: "100%", marginTop: 6, fontSize: 15 }}>
                        <thead>
                          <tr style={{ background: "#f3f4f6" }}>
                            <th style={{ textAlign: "left", padding: 7 }}>Code</th>
                            <th style={{ textAlign: "left", padding: 7 }}>Name</th>
                            <th style={{ textAlign: "left", padding: 7 }}>Grade</th>
                            <th style={{ textAlign: "left", padding: 7 }}>Preparation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ocrDetails.arrears.map(s => (
                            <tr key={s.code}>
                              <td style={{ padding: 7 }}>{s.code}</td>
                              <td style={{ padding: 7 }}>{s.name}</td>
                              <td style={{ padding: 7, color: "#e74c3c" }}>{s.grade}</td>
                              <td style={{ padding: 7 }}>
                                <button style={{
                                  background: "linear-gradient(90deg,#6366f1,#4ade80)", color: "#fff",
                                  borderRadius: 7, border: "none", fontWeight: 700, padding: "5px 14px"
                                }}
                                  onClick={() => alert(`Start preparation for ${s.name}`)}
                                >Start Preparation</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <div style={{ color: "#22c55e", fontWeight: 700, marginTop: 7 }}>No arrears found!</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
