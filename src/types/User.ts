export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  createdAt: string;
}

// Response for fetching the account user
export interface AccountUserResponse {
  success?: boolean;
  user: User;
}

// Context for user data
export interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}