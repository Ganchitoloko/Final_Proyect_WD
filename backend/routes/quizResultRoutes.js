const express = require("express");
const router = express.Router();
const { submitResult, getMyResults } = require("../controllers/quizResultController");
const protect = require("../middleware/authMiddleware");

router.post("/submit", protect, submitResult);
router.get("/my-results", protect, getMyResults);

module.exports = router;
