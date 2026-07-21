import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { hasCachedProfile } from "@/lib/profileCache";
import { ProfileMenu } from "@/components/ProfileMenu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "About", end: true },
  { to: "/upload", label: "Upload" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/insights", label: "Insights" },
] as const;

function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/favicon.ico"
      alt=""
      className={cn("size-10 shrink-0", className)}
      aria-hidden
    />
  );
}

function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const runParam = new URLSearchParams(location.search).get("run");
  const runQuery = runParam ? `?run=${encodeURIComponent(runParam)}` : "";

  return (
    <nav className={cn("flex items-center gap-2", className)}>
      {links.map((l) => {
        const to =
          l.to === "/dashboard" || l.to === "/insights" ? `${l.to}${runQuery}` : l.to;

        return (
        <NavLink
          key={l.to}
          to={to}
          end={"end" in l ? l.end : false}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              // Explicit type styles — identical to the hero "Explore" button.
              // h-9 matches the size-9 icon buttons so text and icons share
              // the same center line.
              "relative inline-flex h-9 items-center px-3 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground/90 hover:text-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              {l.label}
              {isActive ? (
                <span
                  className="absolute inset-x-3 bottom-0 h-px bg-foreground/50"
                  aria-hidden
                />
              ) : null}
            </>
          )}
        </NavLink>
        );
      })}
    </nav>
  );
}

export function Nav() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const showProfile = Boolean(user) || (loading && hasCachedProfile());

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="flex h-[4.75rem] w-full items-center justify-between gap-4 px-5 md:px-10">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display text-left">Menu</SheetTitle>
              </SheetHeader>
              <NavLinks
                className="mt-6 flex-col items-stretch gap-1 [&>a]:px-2"
                onNavigate={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-3 shrink-0">
            <BrandMark />
            <span className="font-display text-2xl font-medium text-foreground">
              Coralytics
            </span>
          </Link>
        </div>

        <NavLinks className="hidden md:flex" />

        <div className="flex shrink-0 items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground/90 hover:text-foreground"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>

          {showProfile ? (
            <ProfileMenu />
          ) : loading ? null : (
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-none border-foreground/35 bg-accent/10 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.22em] backdrop-blur-md hover:bg-accent/20 hover:border-foreground/60"
            >
              <Link to="/login">Login / Sign up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
