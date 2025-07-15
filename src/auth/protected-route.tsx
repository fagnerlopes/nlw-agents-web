import { useAuthStore } from "@/store/use-auth-store";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: Array<"admin" | "member">;
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    // This can happen while the user is being fetched.
    // You might want to show a loading spinner here.
    return null;
  }

  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  return <Navigate to="/rooms" replace />;
} 