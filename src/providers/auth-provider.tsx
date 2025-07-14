import { type ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { api } from "@/lib/api";
import { useLoading } from "./loading-provider";

interface User {
  sub: string;
  name: string;
  role: "admin" | "member";
}

interface MeResponse {
  user: User;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { accessToken, setUser, clearAccessToken } = useAuthStore();
  const { setLoading } = useLoading();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        try {
          const response = await api.get<MeResponse>("/me");
          setUser(response.user);
        } catch (error) {
          console.error("Failed to fetch user", error);
          clearAccessToken();
        } finally {
          setIsAuthenticating(false);
          setLoading(100);
        }
      } else {
        setIsAuthenticating(false);
        setLoading(100);
      }
    };

    fetchUser();
  }, [accessToken, setUser, clearAccessToken, setLoading]);

  if (isAuthenticating) {
    return null;
  }

  return <>{children}</>;
} 