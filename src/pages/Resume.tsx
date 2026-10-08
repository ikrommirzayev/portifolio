import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { IconTile } from "../components/IconTile";
import { OrPlaceholder, Placeholder } from "../components/Placeholder";
import { Reveal } from "../components/Reveal";
import { certificates, profile } from "../data/profile";
import { projects } from "../data/projects";
import { skillLabel, skills, type SkillGroup } from "../data/skills";
import { useLang } from "../lib/useLang";
import styles from "./Resume.module.css";

export default function Resume() {
  const { t } = useTranslation();
  const { lang, pick } = useLang();
  const blankYears = <Placeholder>20__ — 20__</Placeholder>;

  return (
    <article className={styles.resume}>
      <title>{`${t("nav.resume")} · ${profile.name || "Portfolio"}`}</title>

      <motion.header
        className={styles.head}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.avatar}>
          {profile.photo ? <img src={profile.photo} alt={profile.fullName} /> : profile.initials || t("toBeAdded")}
        </div>
        <div>
          <h1>
            <OrPlaceholder value={profile.fullName} fallback={t("namePlaceholder")} />
          </h1>
          <p className={styles.role}>{t("role")} · React / Next.js / Node.js</p>
          <div className={styles.contacts}>
            <span>
              {t("resume.email")}:{" "}
              <b>
                <OrPlaceholder value={profile.email} fallback={t("toBeAdded")} />
              </b>
            </span>
            <span>
              {t("resume.birth")}: <b>{profile.birthDate}</b>
            </span>
            <span>
              {t("resume.phone")}:{" "}
              <b>
                <OrPlaceholder value={profile.phone} fallback={t("toBeAdded")} />
              </b>
            </span>
            <span>
              Telegram:{" "}
              <b>
                <OrPlaceholder value={profile.telegram && `@${profile.telegram.replace(/^@/, "")}`} fallback={t("toBeAdded")} />
              </b>
            </span>
            <span>{pick(profile.city)}</span>
          </div>
        </div>
      </motion.header>

      <Reveal className={styles.section}>
        <h2>{t("resume.summary")}</h2>
        <p>{t("resume.summaryText")}</p>
      </Reveal>

      <Reveal className={styles.section}>
        <h2>{t("resume.skills")}</h2>
        <div className={styles.skills}>
          {(Object.keys(skills) as SkillGroup[]).map((group) => (
            <div key={group}>
              <h3>{t(`skillGroups.${group}`)}</h3>
              <div className="chips">
                {skills[group].map((s) => {
                  const label = skillLabel(s, lang);
                  return (
                    <span key={label} className="chip">
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className={styles.section}>
        <h2>{t("resume.experience")}</h2>
        <div className={styles.entries}>
          {profile.experience.length
            ? profile.experience.map((e) => (
                <div key={e.org + e.when} className={styles.entry}>
                  <h3>{pick(e.role)}</h3>
                  <span className={styles.when}>{e.when}</span>
                  <span className={styles.org}>{e.org}</span>
                  {e.bullets && (
                    <ul className={styles.desc}>
                      {pick(e.bullets).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            : [0, 1].map((i) => (
                <div key={i} className={`${styles.entry} ${styles.blank}`}>
                  <h3>
                    <Placeholder>{t("resume.experiencePlaceholder")}</Placeholder>
                  </h3>
                  <span className={styles.when}>{blankYears}</span>
                </div>
              ))}
        </div>
      </Reveal>

      <Reveal className={styles.section}>
        <h2>{t("resume.education")}</h2>
        <div className={styles.entries}>
          {profile.education.length ? (
            profile.education.map((e) => (
              <div key={pick(e.org)} className={styles.entry}>
                <h3>{pick(e.title)}</h3>
                <span className={styles.when}>{e.when || blankYears}</span>
                <span className={styles.org}>{pick(e.org)}</span>
              </div>
            ))
          ) : (
            <div className={`${styles.entry} ${styles.blank}`}>
              <h3>
                <Placeholder>{t("resume.educationPlaceholder")}</Placeholder>
              </h3>
              <span className={styles.when}>{blankYears}</span>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className={styles.section}>
        <h2>{t("resume.certificates")}</h2>
        <div className={styles.entries}>
          {certificates.map((c) => (
            <div key={c.title} className={styles.entry}>
              <h3>{c.title}</h3>
              <span className={styles.when}>{c.when}</span>
              <span className={styles.org}>{c.org}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className={styles.section}>
        <h2>{t("resume.projects")}</h2>
        <div className={styles.mini}>
          {projects.map((p) => (
            <Link key={p.id} to={`/work/${p.id}`} viewTransition>
              <IconTile project={p} size="sm" />
              <div>
                <h3>{p.name}</h3>
                <p>
                  {p.domain} · {pick(p.type)}
                </p>
              </div>
              <span className={styles.when}>{p.year}</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </article>
  );
}
