import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function useRequireAuth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const requireAuth = useCallback((): boolean => {
    if (user) return true;
    if (loading) return false;
    navigate("/login");
    return false;
  }, [user, loading, navigate]);

  const withAuth = useCallback(
    (action: () => void) => {
      if (!requireAuth()) return;
      action();
    },
    [requireAuth],
  );

  return { user, loading, isGuest: !loading && !user, requireAuth, withAuth };
}
