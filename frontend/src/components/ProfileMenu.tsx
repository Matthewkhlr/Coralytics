import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, RefreshCw } from "lucide-react";
import { analyzeUploads } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUploads } from "@/hooks/useUploads";
import {
  clearCachedProfile,
  readCachedProfile,
  writeCachedProfile,
} from "@/lib/profileCache";
import { cn } from "@/lib/utils";

export function ProfileMenu() {
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  const { uploads } = useUploads(user?.uid);
  const [open, setOpen] = useState(false);
  const [reanalyzing, setReanalyzing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cachedProfile = readCachedProfile();
  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    cachedProfile?.displayName ||
    "User";
  const email = user?.email ?? cachedProfile?.email ?? "";

  useEffect(() => {
    if (!user) return;
    writeCachedProfile(
      user.displayName || user.email?.split("@")[0] || "User",
      user.email,
    );
  }, [user]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    clearCachedProfile();
    await logOut();
    navigate("/");
  };

  const handleReanalyze = async () => {
    if (!user) return;
    setReanalyzing(true);
    try {
      await analyzeUploads({ user_id: user.uid, upload_ids: [], persist: true });
      window.location.reload();
    } finally {
      setReanalyzing(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        disabled={loading && !user}
        onClick={() => {
          if (loading && !user) return;
          setOpen((value) => !value);
        }}
        className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-card/60 border border-border/60 hover:bg-card transition disabled:cursor-default"
      >
        <span className="min-w-[4.5rem] max-w-[6.5rem] truncate text-left">{displayName}</span>
        <ChevronDown size={14} className="shrink-0" />
      </button>

      {open && user ? (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-2xl border border-border/60 bg-card p-2 z-50"
        >
          <p className="px-3 py-2 text-xs text-muted-foreground truncate">{email}</p>
          <Link
            to="/dashboard"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-background/60 transition"
          >
            Dashboard
          </Link>
          <button
            type="button"
            role="menuitem"
            disabled={reanalyzing || uploads.length === 0}
            onClick={() => void handleReanalyze()}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-background/60 transition text-left",
              (reanalyzing || uploads.length === 0) && "opacity-50 cursor-not-allowed",
            )}
          >
            <RefreshCw size={16} className={reanalyzing ? "spin-icon" : undefined} />
            {reanalyzing ? "Re-analyzing…" : "Re-analyze uploads"}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => void handleLogout()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-background/60 transition text-left"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
