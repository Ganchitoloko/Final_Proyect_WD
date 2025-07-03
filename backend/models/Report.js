const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ["Electrical", "Fall Risk", "Fire Hazard", "Chemical", "Slips & Trips", "Other"],
    default: "Other"
  },
  image: {
    type: String // URL de la imagen subida a Cloudinary
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);
