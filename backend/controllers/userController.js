// userController.js
const User = require("../models/User");
const { getMyReports, getReportById } = require("./reportController");

const deleteMyAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.status(200).json({ message: "Cuenta eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la cuenta." });
  }
};

module.exports = {
  deleteMyAccount,
  getMyReports,
  getReportById
};