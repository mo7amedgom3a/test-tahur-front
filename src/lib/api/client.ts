import { ApiResponse } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export const getAuthToken = () => localStorage.getItem("tahur_auth_token");
export const setAuthToken = (token: string) => localStorage.setItem("tahur_auth_token", token);
export const removeAuthToken = () => localStorage.removeItem("tahur_auth_token");

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return {
      success: false,
      message: data.message || "An error occurred",
      errors: data.errors,
      data: data.data
    };
  }

  return {
    success: true,
    data: data.data,
    message: data.message,
    pagination: data.pagination
  };
}

export const api = {
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: "GET",
      headers,
    });

    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: "DELETE",
      headers,
    });

    return handleResponse<T>(response);
  },
};
