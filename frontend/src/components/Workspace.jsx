import React from "react";
import "./Workspace.css";

function Workspace() {
  return (
    <div className="workspace-container">
      {/* Header */}
      <div className="workspace-header">
        <div>
          <h1>Academic Workspace</h1>
          <div style={{ fontSize: "1.05rem", color: "#565C6B", marginTop: "4px" }}>
            Manage your courses, assignments, and academic activities
          </div>
        </div>
        <div className="workspace-header-actions">
          <span className="semester-label">Fall 2025 Semester</span>
          <button className="new-assignment-btn">+ New Assignment</button>
        </div>
      </div>

      {/* Tabs */}
      <nav className="course-tabs">
        <a className="active">All Courses</a>
        <a>CS 301 - Data Structures</a>
        <a>CS 405 - Machine Learning</a>
        <a>CS 350 - Database Design</a>
        <a>MATH 210 - Statistics</a>
      </nav>

      {/* Main grid */}
      <div className="workspace-main">
        {/* Main Left */}
        <div className="main-left">
          {/* Active Assignments */}
          <section className="assignments">
            <h2>Active Assignments</h2>
            <div className="assignment-card due-tomorrow">
              <div className="card-header">
                <span className="due-label red">DUE TOMORROW</span>
                <span className="course-label">CS 301</span>
              </div>
              <div className="card-content">
                <h3>Binary Search Tree Implementation</h3>
                <p>
                  Implement a complete BST with insertion, deletion, and traversal methods. Include unit tests and performance analysis.
                </p>
                <div className="meta-data">
                  <span>Due: Oct 30, 2025 11:59 PM</span> <span>● 100 points</span>
                </div>
                <div className="professor-text">Prof. Sarah Chen</div>
                <div className="progress-bar"><div style={{ width: "60%" }} /></div>
              </div>
              <div className="card-actions">
                <button className="primary-btn">Submit Work</button>
                <a className="details-link">View Details</a>
              </div>
            </div>

            <div className="assignment-card due-soon">
              <div className="card-header">
                <span className="due-label orange">3 DAYS LEFT</span>
                <span className="course-label">CS 405</span>
              </div>
              <div className="card-content">
                <h3>Neural Network Classification</h3>
                <p>
                  Build and train a neural network for image classification using TensorFlow. Compare different architectures and optimization techniques.
                </p>
                <div className="meta-data">
                  <span>Due: Nov 2, 2025 11:59 PM</span> <span>● 150 points</span>
                </div>
                <div className="professor-text">Dr. Michael Rodriguez</div>
                <div className="progress-bar"><div style={{ width: "25%" }} /></div>
              </div>
              <div className="card-actions">
                <button className="purple-btn">Continue Work</button>
                <a className="details-link">View Rubric</a>
              </div>
            </div>

            <div className="assignment-card">
              <div className="card-header">
                <span className="due-label blue">10 DAYS LEFT</span>
                <span className="course-label">CS 350</span>
              </div>
              <div className="card-content">
                <h3>E-Commerce Database Schema</h3>
                <p>
                  Design a comprehensive database schema for an e-commerce platform. Include normalization, indexing strategies, and performance optimization.
                </p>
                <div className="meta-data">
                  <span>Due: Nov 8, 2025 11:59 PM</span> <span>● 120 points</span>
                </div>
                <div className="professor-text">Prof. Emily Watson</div>
                <div className="progress-bar"><div style={{ width: "0%" }} /></div>
              </div>
              <div className="card-actions">
                <button className="green-btn">Start Project</button>
                <a className="details-link">Download Template</a>
              </div>
            </div>
          </section>

          {/* Recent Submissions */}
          <section className="recent-submissions">
            <h2>Recent Submissions</h2>
            <div className="submission-card graded">
              <span>Web Development Portfolio</span>
              <span>CS 320 ● Submitted 2 hours ago ● Grade: A-</span>
              <button className="graded-btn">GRADED</button>
              <a className="feedback-link">View Feedback</a>
            </div>
            <div className="submission-card reviewing">
              <span>Algorithm Analysis Report</span>
              <span>CS 301 ● Submitted 1 day ago ● Under Review</span>
              <button className="reviewing-btn">REVIEWING</button>
              <a className="submission-link">View Submission</a>
            </div>
          </section>
        </div>

        {/* Sidebar (Main Right) */}
        <aside className="main-right">
          <div className="sidebar-card">
            <h3>Quick Actions</h3>
            <ul>
              <li>Upload Assignment</li>
              <li>Browse Resources</li>
              <li>Join Study Group</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Upcoming Deadlines</h3>
            <ul>
              <li className="deadline-red">
                BST Implementation <br/><span>Tomorrow ● CS 301</span>
              </li>
              <li className="deadline-yellow">
                ML Classification <br/><span>Nov 2 ● CS 405</span>
              </li>
              <li className="deadline-blue">
                Database Schema <br/><span>Nov 8 ● CS 350</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Course Progress</h3>
            <ul>
              <li>CS 301 - Data Structures <progress value="85" max="100"/></li>
              <li>CS 405 - Machine Learning <progress value="72" max="100"/></li>
              <li>CS 350 - Database Design <progress value="68" max="100"/></li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Study Resources</h3>
            <ul>
              <li>Practice Problems</li>
              <li>Video Lectures</li>
              <li>Discussion Forums</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Workspace;
