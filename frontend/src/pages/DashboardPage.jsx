import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">SiteBuddy Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold mb-2">📋 Report Summary</h2>
            <p className="text-lg">You have submitted <span className="text-yellow-400 font-bold">{reportCount}</span> report(s).</p>
          </div>

          {/* Quiz Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold mb-2">🧪 Last WHMIS Quiz</h2>
            {latestQuiz ? (
              <>
                <p>✅ Correct: <span className="font-bold text-green-400">{latestQuiz.correct}</span></p>
                <p>❌ Incorrect: <span className="font-bold text-red-400">{latestQuiz.incorrect}</span></p>
                <p>📅 Date: {new Date(latestQuiz.date).toLocaleString()}</p>
              </>
            ) : (
              <p>No WHMIS quiz results found.</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/report")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded font-semibold shadow"
          >
            ➕ Create New Report
          </button>

          <button
            onClick={() => navigate("/my-whmis-results")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded font-semibold shadow"
          >
            📈 View My WHMIS Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

