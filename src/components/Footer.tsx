import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { CodeXml } from "lucide-react";
import { profile } from "../data/profile";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.foot}>
      <Link className={styles.brand} to="/" viewTransition>
        <span className={styles.mark} aria-hidden="true">
          <CodeXml size={14} strokeWidth={2.4} />
        </span>
        {profile.name || t("namePlaceholder")}
      </Link>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
