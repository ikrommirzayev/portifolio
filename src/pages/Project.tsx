import type { CSSProperties } from "react";
import { Link, Navigate, useParams, useViewTransitionState } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, Mouse } from "lucide-react";
import { BrowserFrame, DeviceStage, PhoneFrame, brandStyle } from "../components/Devices";
import { IconTile } from "../components/IconTile";
import { Reveal } from "../components/Reveal";
import { findProject, projects } from "../data/projects";
import { useLang } from "../lib/useLang";
import styles from "./Project.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Project() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { pick } = useLang();
  const p = findProject(id);
  // Name the shared elements only while a transition into or out of this page runs.
  const morph = useViewTransitionState(`/work/${id}`);
  if (!p) return <Navigate to="/work" replace />;

  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const vt = (name: string) => ({ viewTransitionName: morph ? name : undefined }) as CSSProperties;

  return (
    <article className={styles.detail}>
      <title>{`${p.name} · ${pick(p.type)}`}</title>

      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}>
        <Link className={styles.back} to="/work" viewTransition>
          <ArrowLeft size={16} />
          {t("project.back")}
        </Link>
      </motion.div>

      <header className={styles.head}>
        <IconTile project={p} size="lg" vtName={morph ? "project-icon" : undefined} />
        <div>
          <h1 style={vt("project-title")}>{p.name}</h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }}>
            {pick(p.summary)}
          </motion.p>
        </div>
      </header>

      <motion.dl
        className={styles.facts}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.22 }}
      >
        <div>
          <dt>{t("project.year")}</dt>
          <dd>{p.year}</dd>
        </div>
        <div>
          <dt>{t("project.client")}</dt>
          <dd>{pick(p.client)}</dd>
        </div>
        <div>
          <dt>{t("project.type")}</dt>
          <dd>{pick(p.type)}</dd>
        </div>
        <div>
          <dt>{t("project.links")}</dt>
          <dd className={styles.linkList}>
            {p.live ? (
              <a href={p.live.url} target="_blank" rel="noopener noreferrer">
                {p.live.label}
              </a>
            ) : (
              p.domain
            )}
          </dd>
        </div>
      </motion.dl>

      <figure className={styles.showcase} style={{ ...brandStyle(p), ...vt("project-media") }}>
        <BrowserFrame domain={p.domain}>
          <div className={styles.viewport} tabIndex={0} aria-label={`${p.name} — ${p.domain}`}>
            <img src={`/img/${p.id}-page.webp`} alt={`${p.name} — ${p.domain}`} />
          </div>
        </BrowserFrame>
        <motion.div
          className={styles.phoneWrap}
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.35 }}
        >
          <PhoneFrame src={`/img/${p.id}-mobile.webp`} alt={`${p.name} — mobile`} />
        </motion.div>
        <figcaption>
          <Mouse size={14} />
          {t("project.scrollHint")}
        </figcaption>
      </figure>

      <div className={styles.body}>
        <Reveal>
          <h2>{t("project.about")}</h2>
          {pick(p.about).map((para) => (
            <p key={para}>{para}</p>
          ))}

          <div className={styles.stack}>
            <span className="eyebrow">{t("project.stack")}</span>
            <div className="chips">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            {p.live && (
              <a className="btn primary" href={p.live.url} target="_blank" rel="noopener noreferrer">
                {t("project.live")} <ExternalLink size={16} />
              </a>
            )}
          </div>
          {p.offline && <p className={styles.note}>{t("project.offline")}</p>}
        </Reveal>

        <Reveal delay={0.08}>
          <h2>{t("project.built")}</h2>
          <ul className={styles.built}>
            {pick(p.built).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal>
        <Link className={styles.next} to={`/work/${next.id}`} viewTransition>
          <DeviceStage project={next} wide />
          <div>
            <span className="eyebrow">
              {t("project.next")} <ArrowRight size={13} style={{ verticalAlign: "-2px" }} />
            </span>
            <h3>{next.name}</h3>
            <p>{pick(next.summary)}</p>
          </div>
        </Link>
      </Reveal>
    </article>
  );
}
