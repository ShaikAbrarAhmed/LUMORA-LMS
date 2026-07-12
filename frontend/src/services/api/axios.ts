import axios, { 
  type AxiosInstance, 
  type AxiosResponse, 
  type AxiosError, 
  type InternalAxiosRequestConfig 
} from 'axios';
import { getToken } from '@/utils/token';
import { handleApiError } from '@/utils/errorHandler';

// 1. Resolve backend API base URL from Vite environment variables
const baseURL = (import.meta.env.VITE_API_URL as string) || '/api';

// 2. Instantiate and configure Axios client defaults
const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000, // 15 seconds timeout limit
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 3. Request Interceptor: Dynamically attach bearer tokens
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Read the authorization token from token utility
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(handleApiError(error));
  }
);

// 4. Response Interceptor: Standardize all HTTP error codes
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    // Pass errors through the global error parser
    return Promise.reject(handleApiError(error));
  }
);

/**
 * Shorthand helper wrapper objects that automatically unwrap Axios responses
 * and return the underlying payload (.data), keeping Service logic extremely concise.
 */
export const api = {
  get: <T = any>(url: string, config?: any): Promise<T> => 
    apiClient.get<T>(url, config).then(response => response.data),
  
  post: <T = any>(url: string, data?: any, config?: any): Promise<T> => 
    apiClient.post<T>(url, data, config).then(response => response.data),
  
  put: <T = any>(url: string, data?: any, config?: any): Promise<T> => 
    apiClient.put<T>(url, data, config).then(response => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: any): Promise<T> => 
    apiClient.patch<T>(url, data, config).then(response => response.data),
  
  delete: <T = any>(url: string, config?: any): Promise<T> => 
    apiClient.delete<T>(url, config).then(response => response.data),
  
  instance: apiClient
};

export default apiClient;
