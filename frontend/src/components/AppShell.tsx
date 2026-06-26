import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  return (
    <main className="app-shell">
      <Topbar />
      <div className="dashboard">
        <Sidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
