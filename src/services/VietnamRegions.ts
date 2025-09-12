import VietnamRegionsRoutes from "@/router/VietnamRegions-routes";
import getFetchApi from "@/utils/getFetchApi";

export async function getProvinces() {
  return await getFetchApi(VietnamRegionsRoutes.BASE, { method: "GET" });
}

export async function getDistricts(provinceCode: string) {
  const url = VietnamRegionsRoutes.BASE_DISTRICT.replace(
    ":provinceCode",
    provinceCode
  );
  return await getFetchApi(url, { method: "GET" });
}

export async function getWards(districtCode: string) {
  const url = VietnamRegionsRoutes.BASE_WARD.replace(
    ":districtCode",
    districtCode
  );
  return await getFetchApi(url, { method: "GET" });
}
