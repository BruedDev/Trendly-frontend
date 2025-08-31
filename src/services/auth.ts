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
  };
  token?: string;
}

export async function login(data: { email: string; password: string }) {
  const response = await getFetchApi<unknown, LoginResponse>(LOGIN, {
    method: "POST",
    data,
  });

  if (response.success && response.token) {
    document.cookie = `token=${response.token}; path=/; max-age=86400; secure; samesite=none`;
  }

  return response;
}

export async function getMe() {
  return getFetchApi(ME, {
    method: "GET",
  });
}