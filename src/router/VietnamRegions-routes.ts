import { createRoutes } from "@/utils/getRoutes";

export default createRoutes({
  BASE: "/vietnamRegions/provinces",
  BASE_DISTRICT: "/vietnamRegions/districts/:provinceCode",
  BASE_WARD: "/vietnamRegions/wards/:districtCode",
});
