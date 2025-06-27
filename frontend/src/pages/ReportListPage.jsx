import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
      // Actualiza la lista de reportes después de eliminar
      setReports(reports.filter((report) => report._id !== id));
    } catch (err) {
      console.error("Error al eliminar el reporte:", err);
      alert("No se pudo eliminar el reporte.");
    }
  };


  return (
  <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
    <h1 className="text-2xl font-bold mb-6">Mis Reportes</h1>

    {reports.length === 0 ? (
      <p>No hay reportes creados aún.</p>
    ) : (
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Título</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id} className="text-center">
              <td className="border px-4 py-2">
                {report.createdAt
                  ? new Date(report.createdAt).toLocaleString()
                  : "Fecha no disponible"}
              </td>
              <td className="border px-4 py-2">{report.title}</td>
              <td className="border px-4 py-2">{report.description}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(report._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(report._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
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
