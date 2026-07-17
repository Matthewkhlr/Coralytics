import { NavLink, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { hasCachedProfile } from "@/lib/profileCache";
import { ProfileMenu } from "@/components/ProfileMenu";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "About", end: true },
  { to: "/upload", label: "Upload" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/insights", label: "Insights" },
] as const;

const AUTH_SLOT_CLASS = "flex w-[10.5rem] shrink-0 items-center justify-end";

export function Nav() {
  const { user, loading } = useAuth();
  const showProfile = Boolean(user) || (loading && hasCachedProfile());

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <span
            className="w-8 h-8 rounded-md border border-dashed border-border/60 bg-card/40"
            aria-label="Logo placeholder"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            Coralytics
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={"end" in l ? l.end : false}
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 rounded-full text-sm transition",
                  isActive
                    ? "text-foreground bg-card"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/60",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={AUTH_SLOT_CLASS}>
          {showProfile ? (
            <ProfileMenu />
          ) : loading ? null : (
            <Link
              to="/login"
              className="inline-flex items-center whitespace-nowrap px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition"
            >
              Login / Sign up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
