import {
  BarChart3,
  Download,
  FileDown,
  GitCompare,
  Menu,
  Network,
  Settings,
  Upload,
  UserCircle,
} from "lucide-react";
import { OrganismViewport } from "./components/OrganismViewport";

const quickLinks = [
  { label: "Import or export coral", icon: Upload },
  { label: "Download coral report", icon: FileDown },
  { label: "My dashboard", icon: BarChart3 },
  { label: "Compare my coral", icon: GitCompare },
  { label: "Connect with others", icon: Network },
];

const visibilityStats = [
  { label: "Profile views", value: "1.2k" },
  { label: "Shared previews", value: "48" },
  { label: "Recruiter opens", value: "19" },
  { label: "Report exports", value: "7" },
  { label: "Privacy checks", value: "93%" },
];

export function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Coralytics home">
          <span className="brand-mark" aria-hidden="true" />
          <span>Coralytics</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#dashboard">Dashboard</a>
          <a href="#insights">Insights</a>
          <a href="#share">Share</a>
        </nav>

        <div className="account-actions">
          <span className="welcome">Welcome, Korra</span>
          <button className="icon-button" type="button" aria-label="User profile">
            <UserCircle size={22} />
          </button>
          <button className="icon-button" type="button" aria-label="Settings">
            <Settings size={21} />
          </button>
          <button className="icon-button menu-button" type="button" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <section className="dashboard" id="dashboard">
        <aside className="sidebar" aria-label="Quick links and visibility">
          <div className="sidebar-section">
            <p className="section-kicker">Visibility</p>
            <h2>Your coral reach</h2>
            <div className="stats-list">
              {visibilityStats.map((stat) => (
                <div className="stat-row" key={stat.label}>
                  <span className="stat-dot" aria-hidden="true" />
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section quick-links">
            <p className="section-kicker">Quick links</p>
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button className="quick-link" type="button" key={item.label}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="content-grid" aria-label="Coralytics overview">
          <article className="metric-panel">
            <p>Impact strength</p>
            <strong>74%</strong>
            <span>Digital footprint impression</span>
          </article>

          <article className="metric-panel">
            <p>Sentiment balance</p>
            <strong>+0.42</strong>
            <span>Average tone across uploads</span>
          </article>

          <section className="organism-panel" aria-label="3D coral visualiser">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">Personalized 3D coral</p>
                <h1>My Coral</h1>
              </div>
              <button className="secondary-action" type="button">
                <Download size={17} />
                <span>Export</span>
              </button>
            </div>
            <OrganismViewport />
          </section>
        </section>
      </section>
    </main>
  );
}
