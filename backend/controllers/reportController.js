const Report = require("../models/Report");

// Create new report
const createReport = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    const newReport = new Report({
      user: req.user.id,
      title,
      description,
      category,
      image, // image field
    });

    await newReport.save();
    res.status(201).json({ message: "Report successfully created." });
  } catch (error) {
    console.error("Error creating report:", error.message);
    res.status(500).json({ message: "Error creating report." });
  }
};

// Get reports for the logged-in user
const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving reports." });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error retrieving report:", error.message);
    res.status(500).json({ message: "Server error while retrieving report." });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    // Only the creator or admin can delete it
    if (report.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this report." });
    }

    await report.deleteOne();
    res.json({ message: "Report successfully deleted." });
  } catch (error) {
    console.error("Error deleting report:", error.message);
    res.status(500).json({ message: "Error deleting report." });
  }
};

// Update a report
const updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    // Only the creator or admin can edit it
    if (report.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to edit this report." });
    }

    // Update allowed fields
    report.title = req.body.title || report.title;
    report.description = req.body.description || report.description;
    report.category = req.body.category || report.category;
    report.image = req.body.image || report.image;

    const updatedReport = await report.save();

    res.status(200).json(updatedReport);
  } catch (error) {
    console.error("Error updating report:", error.message);
    res.status(500).json({ message: "Server error while updating report." });
  }
};

// Get all reports (admin only)
const getAllReportsForAdmin = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized." });
    }

    const reports = await Report.find()
      .populate("user", "email role")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error retrieving reports for admin:", error.message);
    res.status(500).json({ message: "Error retrieving reports." });
  }
};

module.exports = {
  createReport,
  getMyReports,
  getReportById,
  deleteReport, 
  updateReport,
  getAllReportsForAdmin,
};
