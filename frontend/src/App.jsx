import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import ReportFormPage from "./pages/ReportFormPage";
import ReportListPage from "./pages/ReportListPage";
import WhmisQuizPage from "./pages/WhmisQuizPage";
import MyWhmisResultsPage from "./pages/MyWhmisResultsPage";
import EditReportPage from "./pages/EditReportPage"; // 👈 NUEVO
import RequireRole from "./components/RequireRole";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <RequireRole role="worker">
              <DashboardPage />
            </RequireRole>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <RequireRole role="admin">
              <AdminDashboard />
            </RequireRole>
          }
        />

        <Route
          path="/reports"
          element={
            <RequireRole role="worker">
              <ReportFormPage />
            </RequireRole>
          }
        />

        <Route
          path="/report-list"
          element={
            <RequireRole role="worker">
              <ReportListPage />
            </RequireRole>
          }
        />

        <Route
          path="/reports/edit/:id"
          element={
            <RequireRole role="worker">
              <EditReportPage />
            </RequireRole>
          }
        />

        <Route
          path="/whmis-quiz"
          element={
            <RequireRole role="worker">
              <WhmisQuizPage />
            </RequireRole>
          }
        />

        <Route
          path="/my-whmis-results"
          element={
            <RequireRole role="worker">
              <MyWhmisResultsPage />
            </RequireRole>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
