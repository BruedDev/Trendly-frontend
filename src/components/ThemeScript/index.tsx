import { themeScript } from "@/helper/ThemeScript";

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
