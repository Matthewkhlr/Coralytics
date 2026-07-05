import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

const BUBBLE_COUNT = 7;
const FISH_COUNT = 4;
const JELLYFISH_COUNT = 3;

// Simple silhouette shapes — kept generic/geometric on purpose, not illustrative,
// so they read as ambient depth rather than a cartoon on top of the UI.
function FishSilhouette() {
  return (
    <svg viewBox="0 0 64 32" aria-hidden="true">
      <path d="M2,16 Q14,3 32,10 L46,3 L41,16 L46,29 L32,22 Q14,29 2,16 Z" />
    </svg>
  );
}

function JellyfishSilhouette() {
  return (
    <svg viewBox="0 0 40 60" aria-hidden="true">
      <path
        d="M4,20 C4,10 10,4 20,4 C30,4 36,10 36,20 C36,24 32,26 20,26 C8,26 4,24 4,20 Z"
        opacity="0.55"
      />
      <path
        d="M8,25 C6,32 6,38 8,45 M14,25 C13,33 12,40 14,50 M20,26 C20,33 19,40 20,48 M26,25 C27,33 28,40 26,50 M32,25 C34,32 34,38 32,45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <main className="app-shell">
      {/* Background layer: bubbles, sits behind panels — unchanged */}
      <div className="scene-fx" aria-hidden="true">
        {Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="bubble"
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>

      <Topbar onMenuClick={() => setMobileNavOpen(true)} />

      <div className="dashboard">
        <Sidebar
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />
        <div className="page-content">
          <Outlet />
        </div>
      </div>

      {/* Foreground layer: fish/jellyfish, rendered above panels via z-index +
          screen blend so they read as light passing over content, not a
          block over it. Panels' backdrop-filter blur made the old
          background-layer placement invisible — this fixes that. */}
      <div className="scene-fx-front" aria-hidden="true">
        {Array.from({ length: FISH_COUNT }).map((_, i) => (
          <span
            key={`fish-${i}`}
            className={`fish fish--${i % 3}${i === FISH_COUNT - 1 ? " fish--extra" : ""}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <FishSilhouette />
          </span>
        ))}

        {Array.from({ length: JELLYFISH_COUNT }).map((_, i) => (
          <span
            key={`jelly-${i}`}
            className={`jellyfish jellyfish--${i % 2}${i === JELLYFISH_COUNT - 1 ? " jellyfish--extra" : ""}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <JellyfishSilhouette />
          </span>
        ))}
      </div>
    </main>
  );
}
