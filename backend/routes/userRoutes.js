// userRoutes.js
const express = require("express");
const router = express.Router();
const { deleteMyAccount } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.delete("/delete", protect, deleteMyAccount);

module.exports = router;