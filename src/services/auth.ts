import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";

const { REGISTER, LOGIN, ME } = API_ROUTES.auth;

export async function register(data: { email: string; password: string }) {
  return getFetchApi(REGISTER, {
    method: "POST",
    data,
  });
}

interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    // Add other user fields as needed
  };
  token?: string;
}

export async function login(data: { email: string; password: string }) {
  const response = await getFetchApi<unknown, LoginResponse>(LOGIN, {
    method: "POST",
    data,
  });

  // Nếu login thành công và có token, set cookie manually
  if (response.success && response.token) {
    // Set cookie với settings phù hợp cho cross-domain
    document.cookie = `token=${response.token}; path=/; max-age=86400; secure; samesite=none`;
    console.log('Manual cookie set:', document.cookie);
    console.log('Token from response:', response.token);
  }

  return response;
}

export async function getMe() {
  return getFetchApi(ME, {
    method: "GET",
  });
}