import vietnamRegionsData from "../../vietnamRegions.json";
import type { Province, District, Ward } from "../types/VietnamRegions";

// Lấy danh sách tỉnh/thành phố
export async function getProvinces(): Promise<
  Pick<Province, "name" | "code">[]
> {
  try {
    return vietnamRegionsData.map((province: Province) => ({
      name: province.name,
      code: province.code,
    }));
  } catch {
    throw new Error("Failed to get provinces from local data");
  }
}

// Lấy danh sách quận/huyện theo mã tỉnh
export async function getDistricts(provinceCode: string): Promise<{
  name: string;
  code: number;
  districts: District[];
}> {
  try {
    const province = (vietnamRegionsData as Province[]).find(
      (p) => p.code === parseInt(provinceCode)
    );

    if (!province) {
      throw new Error(`Province with code ${provinceCode} not found`);
    }

    return {
      name: province.name,
      code: province.code,
      districts: province.districts || [],
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to get districts for province ${provinceCode}: ${error.message}`
      );
    }
    throw new Error(
      `Failed to get districts for province ${provinceCode}: Unknown error`
    );
  }
}

// Lấy danh sách xã/phường theo mã quận/huyện
export async function getWards(districtCode: string): Promise<{
  name: string;
  code: number;
  wards: Ward[];
}> {
  try {
    for (const province of vietnamRegionsData as Province[]) {
      if (province.districts) {
        const district = province.districts.find(
          (d) => d.code === parseInt(districtCode)
        );
        if (district) {
          return {
            name: district.name,
            code: district.code,
            wards: district.wards || [],
          };
        }
      }
    }

    throw new Error(`District with code ${districtCode} not found`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to get wards for district ${districtCode}: ${error.message}`
      );
    }
    throw new Error(
      `Failed to get wards for district ${districtCode}: Unknown error`
    );
  }
}
