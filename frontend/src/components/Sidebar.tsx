import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileDown,
  GitCompare,
  LoaderCircle,
  Network,
  Upload,
} from "lucide-react";
import { DEMO_USER_ID } from "../api/config";
import { useUploads } from "../hooks/useUploads";
import { formatPlatform, formatShortDate } from "../lib/format";

const quickLinks = [
  { to: "/upload", label: "Import or export coral", icon: Upload },
  { to: "/share", label: "Download coral report", icon: FileDown },
  { to: "/", label: "My dashboard", icon: BarChart3, end: true },
  { to: "/share", label: "Compare my coral", icon: GitCompare },
  { to: "/share", label: "Connect with others", icon: Network },
];

type SidebarProps = {
  selectedUploadId?: string | null;
  onSelectUpload?: (uploadId: string) => void;
};

export function Sidebar({ selectedUploadId, onSelectUpload }: SidebarProps) {
  const location = useLocation();
  const queryUploadId = new URLSearchParams(location.search).get("upload");
  const { status, uploads, error, reload } = useUploads(DEMO_USER_ID);

  return (
    <aside className="sidebar" aria-label="Uploads and quick links">
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <div>
            <p className="section-kicker">Your uploads</p>
            <h2>Export history</h2>
          </div>
          <button className="text-button" type="button" onClick={() => void reload()}>
            Refresh
          </button>
        </div>

        {status === "loading" ? (
          <div className="sidebar-status" role="status">
            <LoaderCircle className="spin-icon" size={16} aria-hidden="true" />
            <span>Loading uploads…</span>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="sidebar-status sidebar-status--error" role="alert">
            <span>{error}</span>
            <button className="text-button" type="button" onClick={() => void reload()}>
              Retry
            </button>
          </div>
        ) : null}

        {status === "success" && uploads.length === 0 ? (
          <p className="sidebar-empty">
            No uploads yet.{" "}
            <NavLink to="/upload">Import your first export</NavLink>.
          </p>
        ) : null}

        {status === "success" && uploads.length > 0 ? (
          <ul className="uploads-list">
            {uploads.map((upload) => {
              const isSelected =
                selectedUploadId === upload.upload_id ||
                queryUploadId === upload.upload_id;
              const content = (
                <>
                  <span className="upload-filename">{upload.filename}</span>
                  <span className="upload-meta">
                    {formatPlatform(upload.platform)} · {upload.post_count} posts ·{" "}
                    {formatShortDate(upload.created_at)}
                  </span>
                </>
              );

              if (onSelectUpload) {
                return (
                  <li key={upload.upload_id}>
                    <button
                      type="button"
                      className={`upload-item${isSelected ? " upload-item--selected" : ""}`}
                      onClick={() => onSelectUpload(upload.upload_id)}
                    >
                      {content}
                    </button>
                  </li>
                );
              }

              return (
                <li key={upload.upload_id}>
                  <Link
                    to={`/upload?upload=${upload.upload_id}`}
                    className={`upload-item${isSelected ? " upload-item--selected" : ""}`}
                  >
                    {content}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className="sidebar-section quick-links">
        <p className="section-kicker">Quick links</p>
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              className="quick-link"
              to={item.to}
              end={item.end}
              key={item.label}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
