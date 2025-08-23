import { themeScript } from "@/utils/getThemeScript";

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
