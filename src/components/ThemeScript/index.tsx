import { themeScript } from "@/utils/themeScript";

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
