import type { CSSProperties, PointerEvent } from "react";
import { Link, useViewTransitionState } from "react-router";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { Project } from "../data/projects";
import { useLang } from "../lib/useLang";
import { DeviceStage } from "./Devices";
import { IconTile } from "./IconTile";
import styles from "./Tile.module.css";

const spring = { stiffness: 170, damping: 18, mass: 0.5 };

/** Project card: the media tilts toward the pointer under a moving sheen. */
export function Tile({ project, eager = false }: { project: Project; eager?: boolean }) {
  const { pick } = useLang();
  const reduce = useReducedMotion();
  const to = `/work/${project.id}`;
  // True while a view transition runs to or from this project: name the shared elements.
  const morph = useViewTransitionState(to);

  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);
  const sx = useMotionValue(50);
  const sy = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(55% 55% at ${sx}% ${sy}%, oklch(1 0 0 / 0.38), transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 9);
    rx.set(-(py - 0.5) * 7);
    sx.set(px * 100);
    sy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Link className={styles.tile} to={to} viewTransition>
      <motion.div
        className={styles.media}
        style={{ rotateX: rx, rotateY: ry, viewTransitionName: morph ? "project-media" : undefined } as never}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <DeviceStage project={project} eager={eager} />
        <motion.span className={styles.sheen} style={{ background: sheen }} aria-hidden="true" />
      </motion.div>
      <div className={styles.body}>
        <IconTile project={project} vtName={morph ? "project-icon" : undefined} />
        <div className={styles.text}>
          <h3 style={{ viewTransitionName: morph ? "project-title" : undefined } as CSSProperties}>{project.name}</h3>
          <p>{pick(project.summary)}</p>
        </div>
        <span className={styles.year}>{project.year}</span>
      </div>
    </Link>
  );
}
