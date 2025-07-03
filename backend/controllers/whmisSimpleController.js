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

    res.status(201).json({ message: "Result successfully saved." });
  } catch (err) {
    console.error("Error saving result:", err);
    res.status(500).json({ message: "Server error while saving result." });
  }
};

const getMyWhmisResults = async (req, res) => {
  try {
    const results = await WhmisResult.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(results);
  } catch (err) {
    console.error("Error retrieving results:", err);
    res.status(500).json({ message: "Server error while retrieving results." });
  }
};

module.exports = {
  saveWhmisResult,
  getMyWhmisResults
};
