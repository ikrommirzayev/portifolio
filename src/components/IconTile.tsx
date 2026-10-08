import type { CSSProperties } from "react";
import type { Project } from "../data/projects";
import styles from "./IconTile.module.css";

type Size = "sm" | "md" | "lg";

export function IconTile({ project, size = "md", vtName }: { project: Project; size?: Size; vtName?: string }) {
  return (
    <span
      className={`${styles.tile} ${styles[size]}`}
      style={{ "--tile": project.brand.tile, viewTransitionName: vtName } as CSSProperties}
    >
      <img src={project.icon} alt="" />
    </span>
  );
}
