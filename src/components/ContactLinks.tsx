import { useTranslation } from "react-i18next";
import { Mail, Phone, Send } from "lucide-react";
import { profile } from "../data/profile";
import { Placeholder } from "./Placeholder";
import styles from "./ContactLinks.module.css";

/** Telegram, phone and email as buttons; each shows its value so it can be read or copied. */
export function ContactLinks() {
  const { t } = useTranslation();
  const tg = profile.telegram.replace(/^@/, "");

  const items = [
    { key: "telegram", icon: Send, label: "Telegram", value: tg && `@${tg}`, href: tg && `https://t.me/${tg}`, primary: true },
    { key: "phone", icon: Phone, label: t("resume.phone"), value: profile.phone, href: profile.phone && `tel:${profile.phone.replace(/[^\d+]/g, "")}` },
    { key: "email", icon: Mail, label: t("resume.email"), value: profile.email, href: profile.email && `mailto:${profile.email}` },
  ];

  return (
    <ul className={styles.list}>
      {items.map(({ key, icon: Icon, label, value, href, primary }) => (
        <li key={key}>
          {href ? (
            <a
              className={`btn ${primary ? "primary" : ""} ${styles.item}`}
              href={href}
              target={key === "telegram" ? "_blank" : undefined}
              rel={key === "telegram" ? "noopener noreferrer" : undefined}
              aria-label={`${label}: ${value}`}
            >
              <Icon size={17} />
              <span>{value}</span>
            </a>
          ) : (
            <span className={`btn ${styles.item}`}>
              <Icon size={17} />
              <Placeholder>
                {label}: {t("toBeAdded")}
              </Placeholder>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
