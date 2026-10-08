import type { CSSProperties, ReactNode } from "react";
import type { Project } from "../data/projects";
import styles from "./Devices.module.css";

/** CSS variables that tint a stage in the project's own brand colours. */
export const brandStyle = (p: Project) =>
  ({ "--from": p.brand.from, "--to": p.brand.to, "--glow": p.brand.glow }) as CSSProperties;

export function BrowserFrame({ domain, className = "", children }: { domain: string; className?: string; children: ReactNode }) {
  return (
    <div className={`${styles.browser} ${className}`} data-part="browser">
      <div className={styles.bar} aria-hidden="true">
        <i />
        <i />
        <i />
        <span className={styles.url}>{domain}</span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`${styles.phone} ${className}`} data-part="phone">
      <img src={src} alt={alt} width={585} height={1266} loading="lazy" />
    </div>
  );
}

/** Card visual: desktop screenshot in a browser frame with the phone view overlapping. */
export function DeviceStage({ project, eager = false, wide = false }: { project: Project; eager?: boolean; wide?: boolean }) {
  return (
    <div className={`${styles.stage} ${wide ? styles.wide : ""}`} style={brandStyle(project)}>
      <BrowserFrame domain={project.domain} className={styles.stageBrowser}>
        <img
          src={`/img/${project.id}-hero.webp`}
          alt={`${project.name} — ${project.domain}`}
          width={1280}
          height={800}
          loading={eager ? "eager" : "lazy"}
        />
      </BrowserFrame>
      <PhoneFrame src={`/img/${project.id}-mobile.webp`} className={styles.stagePhone} />
    </div>
  );
}
