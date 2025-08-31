import AUTH_ROUTES from "@/router/auth-routes";
import getFetchApi from "@/utils/getFetchApi";

const { LOGIN, REGISTER } = AUTH_ROUTES;

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


export interface AddressPayload {
	street?: string;
	city?: string;
	// Thêm các trường khác nếu cần
}

export interface RegisterPayload {
	fullName: string;
	email: string;
	password: string;
	phoneNumber: string;
	address: AddressPayload;
}

export async function register(payload: RegisterPayload) {
	return getFetchApi(REGISTER, {
		method: "POST",
		data: payload,
	});
}
