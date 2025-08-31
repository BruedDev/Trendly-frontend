import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";
const { USER } = API_ROUTES.user;

export async function getUser() {
  return getFetchApi(USER, {
    method: "GET"
  });
}

