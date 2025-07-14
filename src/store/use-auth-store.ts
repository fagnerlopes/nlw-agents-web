import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
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
  setAccessToken: (token: string) => {
    set({ accessToken: token });
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  },
  clearAccessToken: () => {
    set({ accessToken: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },
}));
