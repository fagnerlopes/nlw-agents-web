import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "./types/login-request";
import type { LoginResponse } from "./types/login-response";
import { useAuthStore } from "../store/use-auth-store";

export function useLogin() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: LoginResponse = await response.json();

      // Corrige: salva o bearer_token no store/localStorage
      if (result.access_token) {
        setAccessToken(result.access_token);
      }

      return result;
    },
  });
}
