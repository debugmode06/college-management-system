import db from "./config/db.js"; // make sure the path matches your db.js

db.query("SELECT * FROM students LIMIT 5", (err, results) => {
  if (err) {
    console.error("❌ Error fetching students:", err.sqlMessage);
  } else {
    console.log("✅ Students fetched from Aiven:");
    console.table(results);
  }
  db.end();
});
