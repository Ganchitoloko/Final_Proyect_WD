const express = require("express");
const { deleteMyAccount } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.delete("/delete", protect, deleteMyAccount);

module.exports = router;
