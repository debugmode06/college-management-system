import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import marksheetRoutes from "./routes/marksheet.js"; // <-- OCR and upload

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// JWT Secret
const JWT_SECRET = "SECRET_KEY"; // For production, use dotenv (.env file)

// Create uploads directory if needed
const uploadDir = "./uploads/marksheets";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer upload for regular marksheet uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/marksheets/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG, JPEG, PNG files are allowed!"));
    }
  },
});

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySql@1234",
  database: "college_portal",
});
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// JWT Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Student Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM students WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 1) {
        const student = results[0];
        const token = jwt.sign(
          { email: student.email, student_id: student.student_id },
          JWT_SECRET,
          { expiresIn: "24h" }
        );
        return res.json({ token, student });
      }
      res.status(401).json({ error: "Invalid email or password" });
    }
  );
});

// Get Profile
app.get("/api/profile", authenticateToken, (req, res) => {
  const email = req.user.email;
  const student_id = req.user.student_id;
  db.query("SELECT * FROM students WHERE email = ?", [email], (err, profileResults) => {
    if (err) return res.status(500).json({ error: "Failed to fetch profile" });
    if (profileResults.length === 0) return res.status(404).json({ error: "User not found" });
    const profile = profileResults[0];
    db.query(
      "SELECT COUNT(*) as count FROM student_grades WHERE student_id = ? AND grade IN ('F', 'RA')",
      [student_id],
      (err, arrearsResults) => {
        profile.has_arrears = !err && arrearsResults[0].count > 0;
        res.json(profile);
      }
    );
  });
});

// Get Arrears
app.get("/api/arrears", authenticateToken, (req, res) => {
  const student_id = req.user.student_id;
  db.query(
    `SELECT subject_code, subject_name, semester, credits, attempts
     FROM student_arrears
     WHERE student_id = ?
     ORDER BY semester, subject_code`,
    [student_id],
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch arrears" });
      res.json({ arrears: results });
    }
  );
});

// Marksheet Upload (image/pdf) (regular, DB write)
app.post(
  "/api/upload-marksheet",
  authenticateToken,
  upload.single("marksheet"),
  (req, res) => {
    try {
      const { semester } = req.body;
      const student_id = req.user.student_id;
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const file_path = req.file.path;
      const file_name = req.file.filename;
      db.query(
        "INSERT INTO marksheets (student_id, semester, file_name, file_path) VALUES (?, ?, ?, ?)",
        [student_id, semester, file_name, file_path],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Failed to save marksheet record" });
          res.json({
            success: true,
            message: "Marksheet uploaded successfully",
            file: file_name,
            semester: semester,
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Failed to upload marksheet" });
    }
  }
);

// Get Marksheets
app.get("/api/marksheets", authenticateToken, (req, res) => {
  const student_id = req.user.student_id;
  db.query(
    "SELECT * FROM marksheets WHERE student_id = ? ORDER BY semester",
    [student_id],
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch marksheets" });
      res.json({ marksheets: results });
    }
  );
});

// Get Arrear Questions
app.get(
  "/api/arrear-questions/:subject_code",
  authenticateToken,
  (req, res) => {
    const { subject_code } = req.params;
    db.query(
      "SELECT * FROM arrear_questions WHERE subject_code = ? ORDER BY year DESC, difficulty",
      [subject_code],
      (err, results) => {
        if (err)
          return res.status(500).json({ error: "Failed to fetch questions" });
        res.json({ questions: results });
      }
    );
  }
);

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 1) {
        const admin = results[0];
        const token = jwt.sign(
          { email: admin.email, admin_id: admin.admin_id, role: admin.role },
          JWT_SECRET,
          { expiresIn: "24h" }
        );
        res.json({ token, admin });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  );
});

// Admin Stats
app.get("/api/admin/stats", authenticateToken, (req, res) => {
  db.query("SELECT COUNT(*) as count FROM students", (err, studentResults) => {
    if (err) return res.status(500).json({ error: "Failed to fetch stats" });
    const stats = {
      totalStudents: studentResults[0].count,
      totalFaculty: 0, // Add SQL for proper counts if needed
      totalCourses: 0, // Add SQL for proper counts if needed
      activeSessions: 342, // Example placeholder
    };
    const activities = [
      {
        icon: "✅",
        action: "New student registered",
        user: "John Doe",
        time: "2 mins ago",
        color: "#10b981",
      },
      {
        icon: "📝",
        action: "Assignment submitted",
        user: "Jane Smith",
        time: "15 mins ago",
        color: "#3b82f6",
      },
      {
        icon: "👨‍🏫",
        action: "Faculty added course",
        user: "Dr. Brown",
        time: "1 hour ago",
        color: "#f59e0b",
      },
    ];
    res.json({ stats, activities });
  });
});

// ADD OCR API ROUTES LAST
app.use("/api", marksheetRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
