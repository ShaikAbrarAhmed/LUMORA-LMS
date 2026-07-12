export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  [key: string]: any;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  user?: User;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password?: string;
}
