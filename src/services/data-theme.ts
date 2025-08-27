import API_ROUTES from "@/router/index";
import getFetchApi from "@/utils/getFetchApi";
const { SAVED_THEME } = API_ROUTES.theme;

export async function saveTheme(uuid: string, theme: string) {
	return getFetchApi(SAVED_THEME, {
		method: 'POST',
		data: { uuid, theme },
	});
}