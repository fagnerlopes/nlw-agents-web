import { useAuthStore } from "../store/use-auth-store";

// Wrapper para fetch com renovação automática do access_token
export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const accessToken = useAuthStore.getState().accessToken;

  // Adiciona o access_token no header Authorization
  const headers = new Headers(init?.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(input, {
    ...init,
    headers,
    credentials: "include", // importante para cookie HTTP Only
  });

  // Se não autorizado, tenta renovar o token e repete a requisição
  if (response.status === 401) {
    const refreshRes = await fetch("http://localhost:3333/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    if (refreshRes.ok) {
      const { access_token } = await refreshRes.json();
      useAuthStore.getState().setAccessToken(access_token);
      headers.set("Authorization", `Bearer ${access_token}`);
      response = await fetch(input, {
        ...init,
        headers,
        credentials: "include",
      });
    } else {
      // Se o refresh falhar, faça logout ou redirecione para login
      useAuthStore.getState().clearAccessToken();
    }
  }

  return response;
}
