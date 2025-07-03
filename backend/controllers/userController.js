const User = require("../models/User");
const { getMyReports, getReportById } = require("./reportController");

const deleteMyAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "Account successfully deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account." });
  }
};

module.exports = {
  deleteMyAccount,
  getMyReports,
  getReportById
};
