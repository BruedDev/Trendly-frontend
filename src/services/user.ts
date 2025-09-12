import API_ROUTES from "@/router/User-routes";
import getFetchApi from "@/utils/getFetchApi";
import { AccountUserResponse, EditProfilePayload } from "@/types/User";

const { ACCOUNT_USER, EDIT_PROFILE } = API_ROUTES;

export async function getAccountUser(): Promise<AccountUserResponse> {
  const response = await getFetchApi<unknown, AccountUserResponse>(
    ACCOUNT_USER,
    {
      method: "GET",
    }
  );
  return response;
}

export async function editProfile(
  data: EditProfilePayload
): Promise<AccountUserResponse> {
  const response = await getFetchApi<EditProfilePayload, AccountUserResponse>(
    EDIT_PROFILE,
    {
      method: "PUT",
      data,
    }
  );
  return response;
}
