import { fetchWithAuth } from "@/http/fetch-with-auth";

const BASE_URL = "http://localhost:3333";

async function request<T>(
  method: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetchWithAuth(url, {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("API request failed with status:", response.status, "and body:", errorBody);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status === 204 || response.headers.get("Content-Length") === "0") {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit): Promise<T> =>
    request<T>("GET", endpoint, options),
  post: <T>(endpoint:string, body: any, options?: RequestInit): Promise<T> =>
    request<T>("POST", endpoint, { ...options, body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: any, options?: RequestInit): Promise<T> =>
    request<T>("PUT", endpoint, { ...options, body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestInit): Promise<T> =>
    request<T>("DELETE", endpoint, options),
}; 