// Hàm sinh mã 8 số ngẫu nhiên
export function randomMSP() {
  // 70% xác suất ra 100xxxxx, 15% ra 10xxxxxx, 15% ra 1xxxx00
  const r = Math.random();
  if (r < 0.7) {
    // 100xxxxx (8 số)
    let msp = '100';
    for (let i = 0; i < 5; i++) {
      msp += Math.floor(Math.random() * 10);
    }
    return msp;
  } else if (r < 0.85) {
    // 10xxxxxx (8 số)
    let msp = '10';
    for (let i = 0; i < 6; i++) {
      msp += Math.floor(Math.random() * 10);
    }
    return msp;
  } else {
    // 1xxxx00 (8 số)
    let msp = '1';
    for (let i = 0; i < 5; i++) {
      msp += Math.floor(Math.random() * 10);
    }
    msp += '00';
    return msp;
  }
}
