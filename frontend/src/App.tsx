import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppShell } from "./components/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { UploadPage } from "./pages/UploadPage";
import { DashboardPage } from "./pages/DashboardPage";
import { InsightsPage } from "./pages/InsightsPage";
import { LoginPage } from "./pages/LoginPage";
import { RecruiterViewPage } from "./pages/RecruiterViewPage";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/view/:token" element={<RecruiterViewPage />} />

          <Route element={<AppShell />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Route>

          {/* Legacy redirects */}
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/organism" element={<Navigate to="/dashboard" replace />} />
          <Route path="/coral" element={<Navigate to="/dashboard" replace />} />
          <Route path="/share" element={<Navigate to="/dashboard" replace />} />
          <Route path="/settings" element={<Navigate to="/upload" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
