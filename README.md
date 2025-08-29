
# Hướng dẫn Quy Trình Làm Việc Front-end (Professional Workflow)

## 1. Kiến trúc Component & UI

- **Component**: Chịu trách nhiệm quản lý logic, state, action và xử lý chức năng. Component có thể import các UI component để kết hợp giao diện với logic. Mọi thao tác liên quan đến state, action, hoặc hook đều thực hiện tại đây. Khi cần truyền dữ liệu hoặc callback cho UI, sử dụng props.
- **UI**: Chỉ đảm nhận việc hiển thị giao diện (render UI). UI component tuyệt đối không sử dụng hook, state hoặc logic xử lý. UI nhận props từ component cha, giúp tái sử dụng giao diện ở nhiều nơi khác nhau một cách nhất quán.
- **Quy tắc**: Mọi xử lý logic, state, action đều nằm ở component. UI chỉ nhận props và render. Điều này giúp tách biệt rõ ràng giữa logic và giao diện, tăng khả năng tái sử dụng và bảo trì.

## 1.1. UI-Only Components

Trong quá trình phát triển giao diện, đối với các component chỉ phục vụ mục đích hiển thị (UI) và không yêu cầu xử lý trạng thái, hook hoặc action, bạn có thể triển khai trực tiếp phần UI trong component. Cách tiếp cận này giúp tăng tốc độ phát triển và giữ cho mã nguồn đơn giản, dễ bảo trì.

**Khuyến nghị:**
- Chỉ áp dụng cho các component tĩnh, không có tương tác hoặc logic phức tạp.
- Nếu cần bổ sung logic hoặc xử lý trạng thái, hãy tách riêng phần xử lý ra khỏi component UI để đảm bảo tính rõ ràng và dễ mở rộng.

## 2. Router

- Thư mục `router/` quản lý cấu hình các route và endpoint API cho toàn bộ ứng dụng. Đảm bảo các route được tổ chức rõ ràng, dễ mở rộng.

## 3. Services & Fetch API

- Thư mục `services/` chịu trách nhiệm phân loại và thực hiện các thao tác fetch API.
	- Đối với API từ Express: sử dụng `src/utils/getFetchApi.ts`.
	- Đối với dữ liệu từ Sanity: sử dụng `src/utils/getSectionById.ts`.
- Đảm bảo mọi thao tác gọi API đều được tách biệt rõ ràng, dễ kiểm soát và mở rộng.

## 4. Styles (SCSS)

- Thư mục `styles/` chứa toàn bộ cấu hình style toàn cục cho dự án.
	- `_baseClass.scss`: Định nghĩa các class dùng chung, giúp tái sử dụng nhanh chóng.
	- `_variables.scss`: Quản lý mã màu, biến theme. Khi cần thay đổi chế độ sáng/tối, chỉ cần cập nhật biến tại đây.
- Ưu tiên sử dụng biến và mixin để đảm bảo tính nhất quán và dễ bảo trì.

## 5. Contexts & Providers

- Thư mục `contexts/` quản lý các context toàn cục.
- Import context vào `providers.ts` và `index.tsx` để tự động tích hợp vào ứng dụng.
- Khi thêm context mới, chỉ cần khai báo trong `providers.ts`, hệ thống sẽ tự động cập nhật cho toàn bộ ứng dụng.

---
### Lưu ý quan trọng
- Nhánh `front-end` là nhánh chính dành cho phát triển. Mọi quy trình làm việc cần tuân thủ chuẩn chuyên nghiệp, rõ ràng, dễ mở rộng và bảo trì.
- Luôn tuân thủ quy tắc tách biệt logic và UI, sử dụng context, service, router, style đúng mục đích.

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. alo
