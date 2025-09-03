import API_ROUTES from "@/router/User-routes";
import getFetchApi from "@/utils/getFetchApi";
import {AccountUserResponse} from "@/types/User";

const { ACCOUNT_USER } = API_ROUTES;

export async function getAccountUser(): Promise<AccountUserResponse> {
  const response = await getFetchApi<unknown, AccountUserResponse>(ACCOUNT_USER, {
    method: "GET",
  });

  return response;
}
