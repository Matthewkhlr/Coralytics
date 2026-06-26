import { Link } from "react-router-dom";
import { Download, GitCompare, Network } from "lucide-react";

const comingSoon = [
  {
    icon: Download,
    title: "Download coral report",
    description: "Export a PDF or JSON snapshot of your analysis and 3D coral.",
  },
  {
    icon: GitCompare,
    title: "Compare my coral",
    description: "Place two analyses side by side to see how your footprint changes.",
  },
  {
    icon: Network,
    title: "Connect with others",
    description: "Share a read-only coral preview with recruiters or collaborators.",
  },
];

export function SharePage() {
  return (
    <section className="share-page" aria-label="Share and export">
      <header className="page-header">
        <p className="section-kicker">Share</p>
        <h1>Export & compare</h1>
        <p className="page-lead">
          Sharing and export tools are planned for a future sprint. Upload and analyze
          your data first from the import page.
        </p>
      </header>

      <div className="share-grid">
        {comingSoon.map((item) => {
          const Icon = item.icon;
          return (
            <article className="share-card" key={item.title}>
              <Icon size={24} aria-hidden="true" />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="coming-soon-pill">Coming soon</span>
            </article>
          );
        })}
      </div>

      <p className="share-cta">
        Ready to grow your coral?{" "}
        <Link to="/upload">Import an export</Link> and run analysis.
      </p>
    </section>
  );
}
