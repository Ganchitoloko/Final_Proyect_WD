const QuizResult = require("../models/QuizResult");

const submitResult = async (req, res) => {
  try {
    const { total, correct, incorrect } = req.body;

    const result = new QuizResult({
      user: req.user.id,
      total,
      correct,
      incorrect,
      date: new Date()
    });

    await result.save();

    res.status(201).json({ message: "Result saved successfully" });
  } catch (err) {
    console.error("Error saving result:", err);
    res.status(500).json({ message: "Server error saving result" });
  }
};

const getMyResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user.id }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: "Server error fetching results" });
  }
};

module.exports = {
  submitResult,
  getMyResults
};
