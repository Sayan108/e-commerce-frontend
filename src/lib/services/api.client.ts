// src/store/auth/apiClient.ts
import axios, { AxiosInstance } from "axios";
import { BaseUrl, Env } from "./api.constants";

// Create a new axios instance with interceptors

const client = axios.create({ baseURL: BaseUrl[Env].baseUrl });

// Request Interceptor: Attach Authorization Token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("persist:root")
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth).token
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("API Response Error:", message);
    return Promise.reject(message);
  }
);

export default client;
