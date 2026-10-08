import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Reveal } from "../components/Reveal";
import { Tile } from "../components/Tile";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import styles from "./Work.module.css";

export default function Work() {
  const { t } = useTranslation();

  return (
    <>
      <title>{`${t("work.title")} · ${profile.name || t("namePlaceholder")}`}</title>

      <header className={styles.intro}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("work.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {t("work.lead")}
        </motion.p>
      </header>

      <section className={styles.grid} aria-label={t("work.title")}>
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={0.15 + (i % 2) * 0.1}>
            <Tile project={p} eager={i < 2} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
