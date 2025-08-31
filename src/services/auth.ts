import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";

const { REGISTER, LOGIN, ME } = API_ROUTES.auth;

export async function register(data: { email: string; password: string }) {
  return getFetchApi(REGISTER, {
    method: "POST",
    data,
  });
}


export async function login(data: { email: string; password: string }) {
  return getFetchApi(LOGIN, {
    method: "POST",
    data,
  });
}


export async function getMe() {
  return getFetchApi(ME, {
    method: "GET",
  });
}
