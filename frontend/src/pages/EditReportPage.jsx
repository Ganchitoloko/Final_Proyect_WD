import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditReportPage.css"; 

function EditReportPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/api/reports/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (error) {
        console.error("Error loading report:", error);
        alert("Failed to load the report.");
      }
    };

    fetchReport();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/reports/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Report updated successfully.");
      navigate("/report-list");
    } catch (error) {
      console.error("Error updating the report:", error);
      alert("Failed to update the report.");
    }
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleUpdate} className="edit-box">
        <h2>✏️ Edit Report</h2>

        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">💾 Update</button>
      </form>
    </div>
  );
}

export default EditReportPage;
