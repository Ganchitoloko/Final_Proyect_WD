const mongoose = require("mongoose");

const whmisResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: Number,
  correct: Number,
  incorrect: Number,
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("WhmisResult", whmisResultSchema);
