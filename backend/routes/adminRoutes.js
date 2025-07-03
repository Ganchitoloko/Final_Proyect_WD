const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router(); 

// Get all users
router.get("/users", protect, adminOnly, getAllUsers);

// Delete user
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
