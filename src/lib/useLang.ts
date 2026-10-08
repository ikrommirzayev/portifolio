import { useTranslation } from "react-i18next";
import type { Lang } from "../i18n";

export type Localized = Record<Lang, string>;
export type LocalizedList = Record<Lang, string[]>;

/** Current language plus a picker for bilingual content objects. */
export function useLang() {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.resolvedLanguage === "en" ? "en" : "uz";
  const pick = <T,>(value: Record<Lang, T>): T => value[lang];
  const toggle = () => i18n.changeLanguage(lang === "uz" ? "en" : "uz");
  return { lang, pick, toggle };
}
