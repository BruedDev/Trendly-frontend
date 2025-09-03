import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";
import type { LoginResponse, RegisterData, LoginData } from "@/types/auth";

const { REGISTER, LOGIN } = API_ROUTES.auth;

export async function register(data: RegisterData) {
  return getFetchApi(REGISTER, {
    method: "POST",
    data,
  });
}

export async function login(data: LoginData) {
  const response = await getFetchApi<unknown, LoginResponse>(LOGIN, {
    method: "POST",
    data,
  });

  if (response.success && response.token) {
    document.cookie = `token=${response.token}; path=/; max-age=86400; secure; samesite=none`;
  }

  return response;
}
