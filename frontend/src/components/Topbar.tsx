import { NavLink } from "react-router-dom";
import { Settings, UserCircle, Menu } from "lucide-react";
import { DEMO_USER_ID } from "../api/config";
import { formatDemoUserLabel } from "../lib/organismData";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/insights", label: "Insights" },
  { to: "/share", label: "Share" },
];

type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="topbar">
      <NavLink className="brand" to="/" aria-label="Coralytics home">
        <span className="brand-mark" aria-hidden="true" />
        <span>Coralytics</span>
      </NavLink>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="account-actions">
        <span className="welcome">Welcome, {formatDemoUserLabel(DEMO_USER_ID)}</span>
        <button className="icon-button" type="button" aria-label="User profile">
          <UserCircle size={22} />
        </button>
        <button className="icon-button" type="button" aria-label="Settings">
          <Settings size={21} />
        </button>
        <button
          className="icon-button menu-button"
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
