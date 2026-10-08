import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import uz from "./locales/uz";
import en from "./locales/en";

const LANGS = ["uz", "en"] as const;
export type Lang = (typeof LANGS)[number];

declare module "i18next" {
  interface CustomTypeOptions {
    resources: { translation: typeof uz };
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { uz: { translation: uz }, en: { translation: en } },
    supportedLngs: LANGS,
    fallbackLng: "uz",
    // Uzbek by default; only an explicit choice (saved in localStorage) switches it.
    detection: { order: ["localStorage"], lookupLocalStorage: "pf-lang", caches: ["localStorage"] },
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});
document.documentElement.lang = i18n.resolvedLanguage ?? "uz";

export default i18n;
