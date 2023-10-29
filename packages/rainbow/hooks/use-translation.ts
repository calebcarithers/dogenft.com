import { useRouter } from "next/router";
import en from "../locales/en-US.json";
import ja from "../locales/ja.json";

type Locale = "en" | "ja";

const locales = { en, ja };

export function useTranslation() {
  const { locale } = useRouter();
  const translations = locales[locale as Locale] || locales.en;
  return { translations };
}
