const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config(); // To use environment variables from a .env file

const app = express();

app.use(cors()); // Enable CORS
// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB Atlas
const dbURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://campspro:5506255P@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
app.use("/api", userRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
