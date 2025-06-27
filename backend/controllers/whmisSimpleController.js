const WhmisResult = require("../models/WhmisResult");

const saveWhmisResult = async (req, res) => {
  try {
    const { total, correct, incorrect } = req.body;

    const result = new WhmisResult({
      user: req.user.id,
      total,
      correct,
      incorrect
    });

    await result.save();

    res.status(201).json({ message: "Resultado guardado correctamente." });
  } catch (err) {
    console.error("Error al guardar el resultado:", err);
    res.status(500).json({ message: "Error del servidor al guardar resultado." });
  }
};

const getMyWhmisResults = async (req, res) => {
  try {
    const results = await WhmisResult.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener resultados:", err);
    res.status(500).json({ message: "Error del servidor al obtener resultados." });
  }
};

module.exports = {
  saveWhmisResult,
  getMyWhmisResults
};
