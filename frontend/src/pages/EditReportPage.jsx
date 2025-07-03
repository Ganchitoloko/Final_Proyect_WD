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
        console.error("Error cargando el reporte:", error);
        alert("No se pudo cargar el reporte.");
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
      alert("Reporte actualizado correctamente.");
      navigate("/report-list");
    } catch (error) {
      console.error("Error actualizando el reporte:", error);
      alert("No se pudo actualizar el reporte.");
    }
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleUpdate} className="edit-box">
        <h2>✏️ Editar Reporte</h2>

        <label>Título</label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">💾 Actualizar</button>
      </form>
    </div>
  );
}

export default EditReportPage;
