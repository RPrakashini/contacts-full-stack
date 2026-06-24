const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// RDS connection
const db = mysql.createConnection({
  host: "database-1.c9sg8088kqsm.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "contactsdb"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed ❌", err);
  } else {
    console.log("Connected to RDS ✅");
  }
});

// API
app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

app.post("/contacts", (req, res) => {
  const { name, phone } = req.body;

  db.query(
    "INSERT INTO contacts (name, phone) VALUES (?, ?)",
    [name, phone],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.send("Inserted");
    }
  );
});

// health check
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Backend running on port " + PORT);
});