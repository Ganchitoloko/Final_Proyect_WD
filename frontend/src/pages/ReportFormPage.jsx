import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ReportFormPage.css";

const API_BASE_URL = "http://localhost:5000/api";

function ReportFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${API_BASE_URL}/reports`,
        { title, description, location, category, image: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Report created successfully.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Failed to create report.");
    }
  };

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dfl0xzx2p",
        uploadPreset: "sitebuddy",
        sources: ["local", "camera"],
        multiple: false,
        maxFileSize: 2000000,
        resourceType: "image",
        folder: "sitebuddy_reports",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
          alert("Image uploaded successfully.");
        }
      }
    );
    widget.open();
  };

  return (
  <div className="report-form-page">
    <form onSubmit={handleSubmit} className="report-form">
      <h2>Create New Report</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">-- Select a category --</option>
        <option value="Electrical">Electrical</option>
        <option value="Fall Risk">Fall Risk</option>
        <option value="Chemical">Chemical</option>
        <option value="Fire Hazard">Fire Hazard</option>
        <option value="Slips & Trips">Slips & Trips</option>
        <option value="Other">Other</option>
      </select>

      <button type="button" onClick={openWidget} className="btn-upload">
        📸 Upload Image
      </button>

      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="Preview" />
        </div>
      )}

      <button type="submit" className="btn-submit">
        Submit Report
      </button>
    </form>
  </div>
);

}

export default ReportFormPage;
