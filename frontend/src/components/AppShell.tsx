import { Outlet } from "react-router-dom";
import { Nav } from "@/components/Nav";

export function AppShell() {
  return (
    <div className="relative min-h-screen bg-ocean-radial overflow-x-hidden">
      <div className="relative z-[1] flex min-h-screen flex-col">
        <Nav />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
