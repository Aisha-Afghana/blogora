const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;
const blogRoutes = require("./routes/blogRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Blogora Backend is running!");
});

// Start server
const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
