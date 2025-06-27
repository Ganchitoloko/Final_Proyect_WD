const express = require("express");
const {
  createReport,
  getMyReports,
  getReportById,
  deleteReport,
  updateReport
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware"); // asegúrate de que esto es correcto

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, getMyReports);
router.get("/:id", protect, getReportById);
router.delete("/:id", protect, deleteReport);
router.put("/:id", protect, updateReport);

module.exports = router;
