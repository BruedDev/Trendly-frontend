import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

/**
 * Hook kiểm tra token trong cookie, nếu không có sẽ chuyển hướng tới trang login.
 * Trả về một hàm callback để dùng cho các sự kiện cần bảo vệ.
 *
 * @param redirectUrl Đường dẫn login, mặc định '/auth/login'
 * @returns (callback: Function) => (...args) => void
 */
export function useProtectRoute(redirectUrl: string = '/auth/login') {
  const router = useRouter();

  /**
   * Hàm bọc callback, kiểm tra token trước khi thực thi callback
   */
  function protectAction<T extends (...args: unknown[]) => unknown>(callback: T) {
    return (...args: Parameters<T>) => {
      const token = Cookies.get('token');
      if (!token) {
        router.push(redirectUrl);
        return false;
      }
      return callback(...args);
    };
  }

  return protectAction;
}
