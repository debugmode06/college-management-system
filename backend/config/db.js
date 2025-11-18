// config/db.js
import mysql from "mysql2";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Check SSL CA file exists
if (!fs.existsSync(process.env.SSL_CA)) {
  console.error(`❌ SSL certificate not found at ${process.env.SSL_CA}`);
  process.exit(1);
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(process.env.SSL_CA),
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to Aiven MySQL");
});

export default db;
