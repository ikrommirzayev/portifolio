import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section style={{ maxWidth: "var(--max)", margin: "clamp(64px, 12vw, 140px) auto 0", display: "grid", gap: 20 }}>
      <title>{t("notFound.title")}</title>
      <span className="eyebrow">404</span>
      <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 600 }}>{t("notFound.title")}</h1>
      <div>
        <Link className="btn" to="/" viewTransition>
          <ArrowLeft size={16} /> {t("notFound.back")}
        </Link>
      </div>
    </section>
  );
}
