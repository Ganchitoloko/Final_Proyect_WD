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
        console.error("Error al obtener los reportes:", err);
      }
    };

    fetchReports();
  }, []);

  const handleEdit = (id) => {
    navigate(`/reports/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar este reporte?");
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
      console.error("Error al eliminar el reporte:", err);
      alert("No se pudo eliminar el reporte.");
    }
  };

  return (
    <div className="report-container">
      <h1 style={{ fontSize: "20px", marginBottom: "1rem" }}>Mis Reportes</h1>

      {reports.length === 0 ? (
        <p>No hay reportes creados aún.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleString()
                    : "Fecha no disponible"}
                </td>
                <td>
                  {report.image ? (
                    <button
                      onClick={() => window.open(report.image, "_blank")}
                      style={{ border: "none", background: "none", cursor: "pointer" }}
                      title="Haz clic para ver la imagen en grande"
                    >
                      <img
                        src={report.image}
                        alt="Reporte"
                        className="report-img"
                      />
                    </button>
                  ) : (
                    <span style={{ color: "#999", fontStyle: "italic" }}>Sin imagen</span>
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
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="button button-delete"
                  >
                    Eliminar
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
