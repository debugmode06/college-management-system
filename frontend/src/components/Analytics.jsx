import React from "react";
import "./Analytics.css";

function Analytics() {
  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1>Analytics Dashboard</h1>
          <div className="analytics-header-desc">
            Data-driven insights for informed decision making
          </div>
        </div>
        <div className="analytics-header-right">
          <span className="header-date">Last updated: Oct 29, 2025 at 9:35 AM</span>
          <button className="export-btn">Export Report</button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="analytics-stats">
        <div className="stats-card blue">
          <div className="stats-title">Overall GPA</div>
          <div className="stats-value">3.85</div>
          <div className="stats-meta">↑ 0.12 from last semester</div>
        </div>
        <div className="stats-card purple">
          <div className="stats-title">Attendance Rate</div>
          <div className="stats-value">94%</div>
          <div className="stats-meta">↑ 2% from last month</div>
        </div>
        <div className="stats-card green">
          <div className="stats-title">Assignments Completed</div>
          <div className="stats-value">28/32</div>
          <div className="stats-meta">87.5% completion rate</div>
        </div>
        <div className="stats-card yellow">
          <div className="stats-title">Study Hours/Week</div>
          <div className="stats-value">24.5</div>
          <div className="stats-meta">↓ 1.2 from last week</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="analytics-main-grid">
        {/* Left Main */}
        <div className="main-left-analytics">
          {/* Performance Trends */}
          <div className="analytics-block">
            <h2>Performance Trends</h2>
            <div className="trend-switch">
              <button className="trend-btn active">6 Months</button>
              <button className="trend-btn">1 Year</button>
              <button className="trend-btn">All Time</button>
            </div>
            <div className="analytics-graph-card">
              {/* Static Graph Example */}
              <svg viewBox="0 0 260 80" style={{width:"100%",height:"62px"}}><polyline points="5,70 35,57 70,44 107,36 145,30 183,25 226,28" fill="none" stroke="#2563eb" strokeWidth="3"/><circle cx="5" cy="70" r="3" fill="#2563eb"/><circle cx="35" cy="57" r="3" fill="#2563eb"/><circle cx="70" cy="44" r="3" fill="#2563eb"/><circle cx="107" cy="36" r="3" fill="#2563eb"/><circle cx="145" cy="30" r="3" fill="#2563eb"/><circle cx="183" cy="25" r="3" fill="#2563eb"/><circle cx="226" cy="28" r="3" fill="#2563eb"/><text x="15" y="78" fontSize="9" fill="#858bb2">Apr</text><text x="55" y="78" fontSize="9" fill="#858bb2">May</text><text x="95" y="78" fontSize="9" fill="#858bb2">Jun</text><text x="135" y="78" fontSize="9" fill="#858bb2">Jul</text><text x="173" y="78" fontSize="9" fill="#858bb2">Aug</text><text x="213" y="78" fontSize="9" fill="#858bb2">Sep</text><text x="232" y="78" fontSize="9" fill="#858bb2">Oct</text></svg>
              <div className="graph-label">GPA Trend</div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="analytics-block">
            <div className="block-header">
              <h2>Subject Performance</h2>
              <a className="details-link">View Details</a>
            </div>
            <div className="subject-row blue">
              <span>
                <b>Data Structures (CS 301)</b> <span className="grade-mark">Current Grade: A-</span>
              </span>
              <span className="subject-progress">92%</span>
              <div className="progress-bar"><div style={{width:"92%"}} /></div>
            </div>
            <div className="subject-row purple">
              <span>
                <b>Machine Learning (CS 405)</b> <span className="grade-mark">Current Grade: B+</span>
              </span>
              <span className="subject-progress">88%</span>
              <div className="progress-bar"><div style={{width:"88%"}} /></div>
            </div>
            <div className="subject-row green">
              <span>
                <b>Database Design (CS 350)</b> <span className="grade-mark">Current Grade: A</span>
              </span>
              <span className="subject-progress">95%</span>
              <div className="progress-bar"><div style={{width:"95%"}} /></div>
            </div>
          </div>

          {/* Study Pattern Analysis */}
          <div className="analytics-block">
            <h2>Study Pattern Analysis</h2>
            <div className="pattern-legend">
              <span className="pattern-legend-item">No activity</span>
              <span className="pattern-legend-item light">Light</span>
              <span className="pattern-legend-item moderate">Moderate</span>
              <span className="pattern-legend-item intensive">Intensive</span>
              <span className="pattern-peak">Peak study time: Saturday afternoons</span>
            </div>
            <div className="pattern-grid">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day,i)=>(
                <div className="day-activity" key={day}>
                  <div className="day-label">{day}</div>
                  {/* Example pattern */}
                  <div className={`activity light`}></div>
                  <div className={`activity moderate`}></div>
                  <div className={`activity intensive`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar (Main Right) */}
        <aside className="main-right-analytics">
          <div className="goal-card">
            <h3>Goal Progress</h3>
            <div className="goal-row">Semester GPA Target <span>3.85/4.00</span></div>
            <div className="goal-progress green">96% achieved – On track!</div>
            <div className="goal-row">Assignment Completion <span>28/32</span></div>
            <div className="goal-progress blue">4 assignments remaining</div>
            <div className="goal-row">Attendance Goal <span>94/95%</span></div>
            <div className="goal-progress purple">Excellent attendance!</div>
          </div>

          <div className="goal-card">
            <h3>AI Predictions</h3>
            <div className="ai-row"><b>Final GPA Projection</b>
              <div>Based on current trends, you're likely to achieve a 3.9 GPA this semester.</div>
            </div>
            <div className="ai-row"><b>Study Recommendation</b>
              <div>Increase ML study time by 20% to maintain current grade trajectory.</div>
            </div>
            <div className="ai-row"><b>Optimal Study Time</b>
              <div>Your peak performance occurs during 2-4 PM study sessions.</div>
            </div>
          </div>

          <div className="goal-card">
            <h3>Peer Comparison</h3>
            <div className="goal-row">Class Average GPA <span>3.42</span></div>
            <div className="goal-row">Your GPA <span className="green-grade">3.85</span></div>
            <div className="peer-performance">You're performing 12.6% above class average</div>
          </div>

          <div className="goal-card">
            <h3>Recent Analytics</h3>
            <div className="recent-row">
              Grade improvement detected in CS 405 (B+ → A-) <span>Oct 28, 2025</span>
            </div>
            <div className="recent-row">
              New milestone: 95% attendance reached <span>Oct 27, 2025</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Analytics;
