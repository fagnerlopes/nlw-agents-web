import axios from "axios";

// Cria uma instância do axios
export const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true, // importante para enviar cookies (refresh_token)
});

// Interceptor de resposta para renovar o access_token automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Se for 401 e não for a rota de refresh, tenta renovar
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/login") &&
      !originalRequest.url.includes("/refresh-token")
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post("/refresh-token");
        const newAccessToken = refreshResponse.data.access_token;
        // Atualize o header Authorization do request original
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Se o refresh falhar, faça logout ou redirecione para login
        // Exemplo: window.location.href = '/login'
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
