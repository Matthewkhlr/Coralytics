import { Outlet } from "react-router-dom";
import { Nav } from "@/components/Nav";

export function AppShell() {
  return (
    <div className="relative min-h-screen bg-ocean-radial overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--background)_40%,transparent)_100%)]" />
      <div className="relative z-[1] flex min-h-screen flex-col">
        <Nav />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
