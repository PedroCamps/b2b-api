const express = require("express");
const { registerUser, getUsers } = require("../controllers/userController");
const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to get all users
router.get("/users", getUsers);

module.exports = router;
