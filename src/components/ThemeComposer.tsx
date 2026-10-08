import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { Check, Monitor, Moon, SlidersHorizontal, Sun, X } from "lucide-react";
import { ACCENTS, useTheme, type Mode } from "../lib/theme";
import styles from "./ThemeComposer.module.css";

/** Floating button that opens a glass panel for theme mode and accent hue. */
export function ThemeComposer() {
  const { t } = useTranslation();
  const { mode, setMode, hue, setHue, reset } = useTheme();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const modes: { id: Mode; label: string; icon: typeof Sun }[] = [
    { id: "system", label: t("composer.system"), icon: Monitor },
    { id: "light", label: t("composer.light"), icon: Sun },
    { id: "dark", label: t("composer.dark"), icon: Moon },
  ];

  return (
    <div className={styles.root} ref={root}>
      <AnimatePresence>
        {open && (
          <motion.section
            className={styles.panel}
            role="dialog"
            aria-label={t("composer.title")}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className={styles.head}>
              <h2>{t("composer.title")}</h2>
              <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={t("composer.close")}>
                <X size={16} />
              </button>
            </header>

            <div className={styles.group}>
              <span className={styles.label}>{t("composer.mode")}</span>
              <div className={styles.modes} role="radiogroup" aria-label={t("composer.mode")}>
                {modes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={mode === id}
                    className={styles.mode}
                    onClick={() => setMode(id)}
                  >
                    {mode === id && <motion.span layoutId="mode-pill" className={styles.modePill} />}
                    <Icon size={15} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.group}>
              <span className={styles.label}>{t("composer.accent")}</span>
              <div className={styles.swatches} role="radiogroup" aria-label={t("composer.accent")}>
                {ACCENTS.map((a) => (
                  <button
                    key={a.hue}
                    type="button"
                    role="radio"
                    aria-checked={hue === a.hue}
                    aria-label={a.name}
                    title={a.name}
                    className={styles.swatch}
                    style={{ "--h": a.hue } as CSSProperties}
                    onClick={() => setHue(a.hue)}
                  >
                    {hue === a.hue && <Check size={14} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className={styles.reset} onClick={reset}>
              {t("composer.reset")}
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("composer.open")}
        whileTap={{ scale: 0.92 }}
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
          <SlidersHorizontal size={18} />
        </motion.span>
      </motion.button>
    </div>
  );
}
