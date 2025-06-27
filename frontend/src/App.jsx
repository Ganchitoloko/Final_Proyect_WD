import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportFormPage from "./pages/ReportFormPage";
import ReportListPage from "./pages/ReportListPage";
import WhmisQuizPage from "./pages/WhmisQuizPage";
import MyWhmisResultsPage from "./pages/MyWhmisResultsPage";
import EditReportPage from "./pages/EditReportPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reports" element={<ReportFormPage />} />
          <Route path="/report-list" element={<ReportListPage />} />
          <Route path="/whmis-quiz" element={<WhmisQuizPage />} />
          <Route path="/my-whmis-results" element={<MyWhmisResultsPage />} />
          <Route path="/reports/edit/:id" element={<EditReportPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
