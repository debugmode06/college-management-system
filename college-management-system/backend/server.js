const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Setup MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySql@1234",
  database: "college_portal",
});

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM students WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (results.length === 1) {
        const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "2h" });
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  );
});

// Profile API
app.get("/api/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const { email } = jwt.verify(token, "SECRET_KEY");
    db.query(
      "SELECT * FROM students WHERE email = ?",
      [email],
      (err, results) => {
        if (results.length === 1) {
          res.json(results[0]);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      }
    );
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(5000, () => console.log("API server running"));
