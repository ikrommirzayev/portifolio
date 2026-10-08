import { useRef, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "motion/react";
import { CodeXml, Database, Layers, PenTool } from "lucide-react";
import { CodeModel } from "../components/CodeModel";
import { Coin } from "../components/Coin";
import { ContactLinks } from "../components/ContactLinks";
import { OrPlaceholder, Placeholder } from "../components/Placeholder";
import { Reveal } from "../components/Reveal";
import { ScrollCue } from "../components/ScrollCue";
import { SectionHeader } from "../components/SectionHeader";
import { Tile } from "../components/Tile";
import { certificates, profile } from "../data/profile";
import { projects } from "../data/projects";
import { skillLabel, skills, type SkillGroup } from "../data/skills";
import { useLang } from "../lib/useLang";
import styles from "./Home.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

/** One headline line that slides up from behind a mask. */
function Line({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className={styles.kline}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.45 + i * 0.12 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const GROUP_ICON: Record<SkillGroup, typeof CodeXml> = {
  frontend: CodeXml,
  backend: Database,
  design: PenTool,
  tooling: Layers,
};

export default function Home() {
  const { t } = useTranslation();
  const { lang, pick } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const points = [
    [t("home.method.p1"), t("home.method.p1d")],
    [t("home.method.p2"), t("home.method.p2d")],
    [t("home.method.p3"), t("home.method.p3d")],
  ];

  return (
    <>
      <title>{`${profile.name || t("namePlaceholder")} · ${t("role")}`}</title>

      {/* ---------- Hero ---------- */}
      <section ref={heroRef} className={styles.hero}>
        <Coin size="clamp(160px, min(30svh, 46vw), 290px)" recede={scrollYProgress} intro label={profile.name || t("role")}>
          {profile.photo ? (
            <img className={styles.portrait} src={profile.photo} alt="" />
          ) : (
            <span className={styles.monogram}>{profile.initials || <CodeXml strokeWidth={1.6} />}</span>
          )}
        </Coin>

        <motion.div className={styles.heroText} style={{ y: textY, opacity: textOpacity }}>
          <h1 className={styles.title}>
            <Line i={0}>{t("home.line1")}</Line>{" "}
            <Line i={1}>
              {t("home.line2")} <span className="accent">{t("home.accent")}</span>
            </Line>
          </h1>
          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
          >
            {t("home.subBefore")} <OrPlaceholder value={profile.name} fallback={t("namePlaceholder")} />
            {t("home.subAfter")}
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}>
          <ScrollCue href="#work" label={t("home.scroll")} />
        </motion.div>
      </section>

      {/* ---------- About ---------- */}
      <section className={styles.section}>
        <Reveal className={styles.about}>
          <span className={styles.eyebrow}>/ {t("home.about.eyebrow")}</span>
          <p className={styles.aboutText}>{t("resume.summaryText")}</p>
        </Reveal>
      </section>

      {/* ---------- Work ---------- */}
      <section id="work" className={styles.section}>
        <SectionHeader title={t("work.title")} />
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.1}>
              <Tile project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Method ---------- */}
      <section className={styles.section}>
        <Reveal className={styles.method}>
          <div className={styles.methodText}>
            <span className={styles.eyebrow}>/ {t("home.method.eyebrow")}</span>
            <h2>{t("home.method.title")}</h2>
            <ol className={styles.points}>
              {points.map(([title, body], i) => (
                <li key={title}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <CodeModel />
        </Reveal>
      </section>

      {/* ---------- Experience ---------- */}
      <section className={styles.section}>
        <SectionHeader eyebrow={t("home.experience.eyebrow")} title={t("home.experience.title")} />
        <ol className={styles.timeline}>
          {profile.experience.length
            ? profile.experience.map((e, i) => (
                <Reveal as="li" key={e.org + e.when} delay={i * 0.05} className={styles.tlItem}>
                    <span className={styles.node}>{e.org.slice(0, 1)}</span>
                    <div className={styles.tlBody}>
                      <h3>
                        {pick(e.role)} · <span>{e.org}</span>
                      </h3>
                      <span className={styles.period}>{e.when}</span>
                      {e.bullets && (
                        <ul>
                          {pick(e.bullets).map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                </Reveal>
              ))
            : [0, 1].map((i) => (
                <Reveal as="li" key={i} delay={i * 0.05} className={styles.tlItem}>
                    <span className={`${styles.node} ${styles.nodeBlank}`}>?</span>
                    <div className={styles.tlBody}>
                      <h3>
                        <Placeholder>{t("resume.experiencePlaceholder")}</Placeholder>
                      </h3>
                      <span className={styles.period}>
                        <Placeholder>20__ — 20__</Placeholder>
                      </span>
                    </div>
                </Reveal>
              ))}
        </ol>
      </section>

      {/* ---------- Stack ---------- */}
      <section className={styles.section}>
        <SectionHeader eyebrow={t("home.stack.eyebrow")} title={t("home.stack.title")} />
        <div className={styles.stack}>
          {(Object.keys(skills) as SkillGroup[]).map((group, i) => {
            const Icon = GROUP_ICON[group];
            return (
              <Reveal key={group} delay={i * 0.07} className={styles.stackCard}>
                <span className={styles.stackIcon}>
                  <Icon size={20} />
                </span>
                <h3>{t(`skillGroups.${group}`)}</h3>
                <ul>
                  {skills[group].map((s) => {
                    const label = skillLabel(s, lang);
                    return <li key={label}>{label}</li>;
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- Credentials ---------- */}
      <section className={`${styles.section} ${styles.creds}`}>
        <Reveal className={styles.cred}>
          <span className={styles.eyebrow}>/ {t("home.creds.education")}</span>
          {profile.education.length ? (
            profile.education.map((e) => (
              <div key={pick(e.org)}>
                <h3>{pick(e.title)}</h3>
                <p>
                  {pick(e.org)}
                  {e.when && ` · ${e.when}`}
                </p>
              </div>
            ))
          ) : (
            <div>
              <h3>
                <Placeholder>{t("resume.educationPlaceholder")}</Placeholder>
              </h3>
            </div>
          )}
        </Reveal>
        <Reveal className={styles.cred} delay={0.08}>
          <span className={styles.eyebrow}>/ {t("home.creds.certificate")}</span>
          {certificates.map((c) => (
            <div key={c.title}>
              <h3>{c.title}</h3>
              <p>
                {c.org} · {c.when}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Signature ---------- */}
      <section className={styles.signature}>
        <Reveal className={styles.sigInner}>
          <Coin size="clamp(130px, min(22svh, 34vw), 200px)" label={t("home.signature")}>
            <span className={styles.markFace}>
              <CodeXml strokeWidth={2} />
            </span>
          </Coin>
          <h2>{t("home.signature")}</h2>
          <ContactLinks />
        </Reveal>
      </section>
    </>
  );
}
