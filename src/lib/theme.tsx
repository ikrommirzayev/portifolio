import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Mode = "system" | "light" | "dark";

/** Accent hues offered by the theme composer (OKLCH hue angles). */
export const ACCENTS = [
  { hue: 246, name: "Ko‘k / Blue" },
  { hue: 285, name: "Binafsha / Violet" },
  { hue: 165, name: "Yashil / Green" },
  { hue: 70, name: "Qahrabo / Amber" },
  { hue: 28, name: "Qizil / Red" },
  { hue: 340, name: "Pushti / Pink" },
] as const;
const DEFAULT_HUE = 246;

const MODE_KEY = "pf-theme";
const HUE_KEY = "pf-hue";

const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string | null) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the choice lasts for this visit */
  }
};

interface ThemeState {
  mode: Mode;
  setMode: (m: Mode) => void;
  hue: number;
  setHue: (h: number) => void;
  isDark: boolean;
  reset: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);
const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const v = read(MODE_KEY);
    return v === "light" || v === "dark" ? v : "system";
  });
  const [hue, setHue] = useState<number>(() => Number(read(HUE_KEY)) || DEFAULT_HUE);
  const [systemDark, setSystemDark] = useState(() => darkQuery().matches);

  useEffect(() => {
    const mq = darkQuery();
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "system") delete root.dataset.theme;
    else root.dataset.theme = mode;
    write(MODE_KEY, mode === "system" ? null : mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-h", String(hue));
    write(HUE_KEY, hue === DEFAULT_HUE ? null : String(hue));
  }, [hue]);

  const value = useMemo<ThemeState>(
    () => ({
      mode,
      setMode,
      hue,
      setHue,
      isDark: mode === "system" ? systemDark : mode === "dark",
      reset: () => {
        setMode("system");
        setHue(DEFAULT_HUE);
      },
    }),
    [mode, hue, systemDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
