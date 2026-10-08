import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./SectionHeader.module.css";

export function SectionHeader({ eyebrow, title, aside }: { eyebrow?: string; title: string; aside?: ReactNode }) {
  return (
    <Reveal className={styles.head}>
      <div>
        {eyebrow && <span className={styles.eyebrow}>/ {eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {aside}
    </Reveal>
  );
}
