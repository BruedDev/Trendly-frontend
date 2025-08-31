
import AUTH_ROUTES from "@/router/auth-routes";
import getFetchApi from "@/utils/getFetchApi";

const { LOGIN } = AUTH_ROUTES;

export interface LoginPayload {
	email: string;
	password: string;
}

export async function login(payload: LoginPayload) {
	return getFetchApi(LOGIN, {
		method: "POST",
		data: payload,
	});
}
