import React from "react";
import "./Assessment.css";
import { FiUpload, FiBookOpen, FiMessageCircle, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { MdFeedback } from "react-icons/md";

function Assessment() {
  return (
    <div className="assessment-container">
      {/* Portal Header */}
      <section className="assessment-header">
        <div className="assessment-gradient">
          <h1>Assessment Portal</h1>
          <span>Manage assignments, submit work, and track your academic progress all in one place.</span>
          <div className="assessment-status">
            <span>🗂 3 assignments due this week</span>
            <span>✅ 2 assignments graded</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="assessment-quick-actions">
        <div className="action-card">
          <div className="action-icon upload"><FiUpload size={28} /></div>
          <h3>Upload Assignment</h3>
          <p>Submit your work</p>
        </div>
        <div className="action-card">
          <div className="action-icon grades"><FiBookOpen size={28} /></div>
          <h3>View Grades</h3>
          <p>Check results</p>
        </div>
        <div className="action-card">
          <div className="action-icon feedback"><MdFeedback size={28} /></div>
          <h3>Feedback</h3>
          <p>View comments</p>
        </div>
        <div className="action-card">
          <div className="action-icon due"><FiCalendar size={28} /></div>
          <h3>Due Dates</h3>
          <p>Track deadlines</p>
        </div>
      </section>

      {/* Main Grid: Submission + Sidebar */}
      <div className="assessment-main">
        {/* Submission Section */}
        <section className="submission-section">
          <h2>Assignment Submission</h2>
          <div className="submission-card">
            <button className="new-submission-btn"><FiCheckCircle style={{marginRight:"8px"}} />New Submission</button>
            <div className="dropzone">
              <div className="drop-icon"><FiUpload size={36} /></div>
              <p>Drop files here or click to browse</p>
              <span>Supported formats: PDF, DOC, DOCX, TXT (Max 50MB)</span>
              <button className="choose-files-btn">Choose Files</button>
            </div>
            <div className="submission-fields">
              <select>
                <option>Data Structures Final Project</option>
                <option>ML Quiz</option>
                <option>Database Report</option>
              </select>
              <select>
                <option>Initial Submission</option>
                <option>Re-submission</option>
              </select>
              <input type="text" placeholder="Add any notes about your submission..." />
              <button className="submit-assignment-btn">Submit Assignment</button>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="assessment-sidebar">
          <div className="sidebar-card">
            <h3>Upcoming Deadlines</h3>
            <ul>
              <li className="deadline-red">
                Data Structures Project <br/><span>Due Tomorrow • CS 301</span>
              </li>
              <li className="deadline-yellow">
                ML Quiz <br/><span>Due Nov 2 • CS 405</span>
              </li>
              <li className="deadline-blue">
                Database Report <br/><span>Due Nov 8 • CS 350</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Grade Summary</h3>
            <div>Current GPA <span className="grade-gpa">3.85</span></div>
            <div>Assignments Completed <span className="grade-num">28/32</span></div>
            <div>Average Score <span className="grade-score">89.5%</span></div>
            <div className="progress-bar">
              <div style={{width: "89.5%"}}></div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Performance Analytics</h3>
            <div className="analytics-summary">
              <span>Improvement <b>+12%</b></span>
              <span>Consistency <b>94%</b></span>
            </div>
            <div className="analytics-graph"></div>
          </div>
        </aside>
      </div>

      {/* Recent Submissions */}
      <section className="assessment-recent">
        <h2>Recent Submissions</h2>
        <div className="recent-card graded">
          <span className="recent-title">Web Development Portfolio</span>
          <span>CS 250 • Submitted Oct 28, 2025 at 3:45 PM</span>
          <span className="recent-grade">GRADED <b>A+ (92%)</b></span>
        </div>
        <div className="recent-card reviewing">
          <span className="recent-title">Algorithm Analysis Report</span>
          <span>CS 320 • Submitted Oct 27, 2025 at 2:12 PM</span>
          <span className="recent-grade">REVIEWING</span>
        </div>
      </section>
    </div>
  );
}

export default Assessment;
