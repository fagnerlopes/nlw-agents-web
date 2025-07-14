import { create } from "zustand";

interface User {
  sub: string;
  name: string;
  role: "admin" | "member";
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setUser: (user: User | null) => void;
  clearAccessToken: () => void;
}

const ACCESS_TOKEN_KEY = "access_token";

function getInitialToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: getInitialToken(),
  user: null,
  setAccessToken: (token: string) => {
    set({ accessToken: token });
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  },
  setUser: (user: User | null) => {
    set({ user });
  },
  clearAccessToken: () => {
    set({ accessToken: null, user: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },
}));
