import axios, { type AxiosError } from 'axios';

/**
 * Standardized API Error class for the LUMORA frontend.
 * Captures status code, field validation errors, and custom API codes.
 */
export class LumoraApiError extends Error {
  public status?: number;
  public errors?: Record<string, string[]>;
  public code?: string;

  constructor(message: string, status?: number, errors?: Record<string, string[]>, code?: string) {
    super(message);
    this.name = 'LumoraApiError';
    this.status = status;
    this.errors = errors;
    this.code = code;

    // Adjust prototype chain for ES6 custom errors in TypeScript
    Object.setPrototypeOf(this, LumoraApiError.prototype);
  }
}

/**
 * Utility to parse Axios or native JavaScript errors into a standardized LumoraApiError.
 * Logs unexpected errors to the console and handles HTTP fallback warnings.
 */
export const handleApiError = (error: unknown): LumoraApiError => {
  let message = 'An unexpected error occurred.';
  let status: number | undefined;
  let errors: Record<string, string[]> | undefined;
  let code: string | undefined;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    status = axiosError.response?.status;
    const data = axiosError.response?.data;

    // 1. Try to extract detailed error info returned by backend
    if (data && typeof data === 'object') {
      message = data.message || data.error_message || data.error || axiosError.message || message;
      errors = data.errors;
      code = data.code || data.error_code;
    } else {
      message = axiosError.message || message;
    }

    // 2. Fallback messages based on HTTP Status codes
    switch (status) {
      case 400:
        message = message || 'Bad request. Please verify details.';
        break;
      case 401:
        message = message || 'Session expired. Please log in again.';
        break;
      case 403:
        message = message || 'Access denied. You do not have permission.';
        break;
      case 404:
        message = message || 'The requested resource was not found.';
        break;
      case 422:
        message = message || 'Validation failed. Please correct details.';
        break;
      case 500:
        message = message || 'Internal Server Error. Please contact support.';
        break;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  // Log to console for developer diagnosis
  console.error('[API Connection Error]:', { message, status, errors, code });

  return new LumoraApiError(message, status, errors, code);
};
