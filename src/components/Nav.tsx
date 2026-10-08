import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { CodeXml, Moon, Sun } from "lucide-react";
import { profile } from "../data/profile";
import { useLang } from "../lib/useLang";
import { useTheme } from "../lib/theme";
import styles from "./Nav.module.css";

export function Nav() {
  const { t } = useTranslation();
  const { lang, toggle: toggleLang } = useLang();
  const { isDark, setMode } = useTheme();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  const onResume = pathname === "/resume";
  const onWork = pathname.startsWith("/work");

  return (
    <motion.header
      className={styles.nav}
      data-scrolled={scrolled}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <div className={styles.pill}>
        <Link className={styles.brand} to="/" viewTransition aria-label={t("nav.home")}>
          <span className={styles.mark} aria-hidden="true">
            <CodeXml size={17} strokeWidth={2.4} />
          </span>
          <span className={styles.name}>
            <b>{profile.name || t("namePlaceholder")}</b>
            <span>{t("role")}</span>
          </span>
        </Link>
        <nav className={styles.links} aria-label="Sections">
          <Link className="btn" to="/resume" viewTransition aria-current={onResume ? "page" : undefined}>
            {t("nav.resume")}
          </Link>
          <Link className="btn primary" to="/work" viewTransition aria-current={onWork ? "page" : undefined}>
            {t("nav.work")}
          </Link>
        </nav>
      </div>
      <button className={styles.round} type="button" onClick={toggleLang} aria-label={t("nav.language")}>
        {lang === "uz" ? "EN" : "UZ"}
      </button>
      <button
        className={styles.round}
        type="button"
        onClick={() => setMode(isDark ? "light" : "dark")}
        aria-label={t("nav.theme")}
      >
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ display: "grid" }}
        >
          {isDark ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
        </motion.span>
      </button>
    </motion.header>
  );
}
