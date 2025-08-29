import { useClient } from 'sanity';
import { randomMSP } from '../utils/generateMSP';

// Hook sinh mã MSP duy nhất, kiểm tra trùng lặp qua Sanity Studio client
export function useGenerateUniqueMSP() {
  const client = useClient({ apiVersion: '2023-01-01' });

  // Kiểm tra trùng MSP
  const isMSPUnique = async (msp: string) => {
    const query = `count(*[_type == "product" && msp == $msp])`;
    const count = await client.fetch(query, { msp });
    return count === 0;
  };

  // Sinh mã duy nhất
  const generateUniqueMSP = async () => {
    let msp = randomMSP();
    let tries = 0;
    while (!(await isMSPUnique(msp)) && tries < 10) {
      msp = randomMSP();
      tries++;
    }
    if (tries >= 10) throw new Error('Không thể sinh mã MSP duy nhất, thử lại!');
    return msp;
  };

  return generateUniqueMSP;
}
