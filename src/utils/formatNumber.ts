/**
 * Format số thành tiền tệ (VND)
 * @param value number
 * @returns string "200.000 ₫"
 */

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // bỏ phần thập phân
  }).format(value);
}

/**
 * Format số có dấu phân cách hàng nghìn
 * @param value number
 * @returns string "1.234.567"
 */

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}
