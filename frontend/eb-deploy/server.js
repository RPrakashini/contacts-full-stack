const express = require("express");
const path = require("path");

const app = express();

// Serve React build files
app.use(express.static(path.join(__dirname, "build")));

// Handle all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Port for Elastic Beanstalk
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Frontend running on port " + PORT);
});