import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchAllReports = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/reports/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAllReports();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted.");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Failed to delete user.");
    }
  };

  const handleDeleteReport = async (reportId) => {
  if (!window.confirm("Are you sure you want to delete this report?")) return;
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:5000/api/reports/${reportId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Report deleted.");
    fetchAllReports(); 
  } catch (error) {
    console.error("Error deleting report", error);
    alert("Failed to delete report.");
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🛡️ Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </header>

      {/* Tabla de usuarios */}
      <section className="user-list-section">
        <h2>👥 Registered Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="reports-section">
        <h2>📋 All Safety Reports</h2>
        {reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <table className="user-table">
            <thead>
  <tr>
    <th>Title</th>
    <th>Category</th>
    <th>Description</th>
    <th>User Email</th>
    <th>Date</th>
    <th>Action</th> 
  </tr>
</thead>
            <tbody>
              {reports.map((report) => (
  <tr key={report._id}>
    <td>{report.title}</td>
    <td>{report.category}</td>
    <td>{report.description}</td>
    <td>{report.user?.email || "Unknown"}</td>
    <td>{new Date(report.createdAt).toLocaleString()}</td>
    <td>
      <button
        className="delete-btn"
        onClick={() => handleDeleteReport(report._id)}
      >
        🗑️ Delete
      </button>
    </td>
  </tr>
))}

            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
