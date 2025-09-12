export interface RegisterData {
  fullName: string;
  email: string;
  address: string;
  password: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
  };
  token?: string;
}
