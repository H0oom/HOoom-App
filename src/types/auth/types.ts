export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}
