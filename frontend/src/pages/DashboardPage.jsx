import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/DashboardPage.css";
import SafetyTipsCarousel from "../components/SafetyTipsCarousel";
import SafetyRightsGuide from "../components/SafetyRightsGuide";

function DashboardPage() {
  const [reportCount, setReportCount] = useState(0);
  const [latestQuiz, setLatestQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const reportsRes = await axios.get("http://localhost:5000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReportCount(reportsRes.data.length);

        const quizRes = await axios.get("http://localhost:5000/api/quiz-results/my-results", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (quizRes.data.length > 0) {
          setLatestQuiz(quizRes.data[0]);
        }
      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
     <div className="dashboard-page admin-container">
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>SiteBuddy Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>📋 Report Summary</h2>
          <p>
            You have submitted <span className="highlight">{reportCount}</span> report(s).
          </p>
        </div>

        <div className="card">
          <h2>🧪 Last WHMIS Quiz</h2>
          {latestQuiz ? (
            <>
              <p>✅ Correct: <span className="green">{latestQuiz.correct}</span></p>
              <p>❌ Incorrect: <span className="red">{latestQuiz.incorrect}</span></p>
              <p>📅 Date: {new Date(latestQuiz.date).toLocaleString()}</p>
            </>
          ) : (
            <p>No WHMIS quiz results found.</p>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate("/reports")}>➕ New Report</button>
        <button onClick={() => navigate("/report-list")}>📋 All Reports</button>
        <button onClick={() => navigate("/whmis-quiz")}>🧪 WHMIS Quiz</button>
      </div>
      <SafetyTipsCarousel />
      <SafetyRightsGuide />
    </div>
  </div>
  );
}

export default DashboardPage;
