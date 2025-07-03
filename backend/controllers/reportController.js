const Report = require("../models/Report");

// Crear un nuevo reporte
const createReport = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    const newReport = new Report({
      user: req.user.id,
      title,
      description,
      category,
      image, // nuevo campo
    });

    await newReport.save();
    res.status(201).json({ message: "Reporte creado con éxito." });
  } catch (error) {
    console.error("Error al crear el reporte:", error.message);
    res.status(500).json({ message: "Error al crear el reporte." });
  }
};

// Obtener los reportes del usuario logueado
const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los reportes." });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Reporte no encontrado." });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error al obtener el reporte:", error.message);
    res.status(500).json({ message: "Error del servidor al obtener el reporte." });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Reporte no encontrado." });
    }

    // Solo el creador del reporte o el admin puede eliminarlo
    if (report.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado para eliminar este reporte." });
    }

    await report.deleteOne();
    res.json({ message: "Reporte eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar reporte:", error.message);
    res.status(500).json({ message: "Error al eliminar el reporte." });
  }
};

const updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Reporte no encontrado." });
    }

    // Solo el creador o admin puede editarlo
    if (report.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado para editar este reporte." });
    }

    // Actualizar campos permitidos
    report.title = req.body.title || report.title;
    report.description = req.body.description || report.description;
    report.category = req.body.category || report.category;
    report.image = req.body.image || report.image; // nuevo campo editable

    const updatedReport = await report.save();

    res.status(200).json(updatedReport);
  } catch (error) {
    console.error("Error al editar el reporte:", error.message);
    res.status(500).json({ message: "Error del servidor al actualizar el reporte." });
  }
};

module.exports = {
  createReport,
  getMyReports,
  getReportById,
  deleteReport, 
  updateReport,
};
