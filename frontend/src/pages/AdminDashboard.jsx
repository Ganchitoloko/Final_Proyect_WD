import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css"; // asegúrate de tener buen contraste


function AdminDashboard() {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted.");
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Failed to delete user.");
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
    </div>
  );
}

export default AdminDashboard;
