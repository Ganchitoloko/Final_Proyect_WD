import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ReportListPage.css";

function ReportListPage() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  const handleEdit = (id) => {
    navigate(`/reports/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this report?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(reports.filter((report) => report._id !== id));
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete the report.");
    }
  };

  return (
    <div className="report-container">
      <h1 style={{ fontSize: "20px", marginBottom: "1rem" }}>My Reports</h1>
      <button className="back-dashboard-btn" onClick={() => navigate("/dashboard")}>
        ⬅️ Back to Dashboard
      </button>

      {reports.length === 0 ? (
        <p>No reports created yet.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleString()
                    : "Unavailable"}
                </td>
                <td>
                  {report.image ? (
                    <button
                      onClick={() => window.open(report.image, "_blank")}
                      style={{ border: "none", background: "none", cursor: "pointer" }}
                      title="Click to view full image"
                    >
                      <img
                        src={report.image}
                        alt="Report"
                        className="report-img"
                      />
                    </button>
                  ) : (
                    <span style={{ color: "#999", fontStyle: "italic" }}>No image</span>
                  )}
                </td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>
                  <span className={`category-badge ${
                    report.category === "Electrical"
                      ? "category-electrical"
                      : report.category === "Fall Risk"
                      ? "category-fall"
                      : report.category === "Fire Hazard"
                      ? "category-fire"
                      : report.category === "Chemical"
                      ? "category-chemical"
                      : report.category === "Slips & Trips"
                      ? "category-trips"
                      : "category-other"
                  }`}>
                    {report.category}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(report._id)}
                    className="button button-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="button button-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportListPage;
