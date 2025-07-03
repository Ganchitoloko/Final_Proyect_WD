const express = require("express");
const {
  createReport,
  getMyReports,
  getReportById,
  deleteReport,
  updateReport,
  getAllReportsForAdmin
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, getMyReports);
router.get("/:id", protect, getReportById);
router.delete("/:id", protect, deleteReport);
router.put("/:id", protect, updateReport);
router.get("/admin/all", protect, isAdmin, getAllReportsForAdmin);

module.exports = router;
