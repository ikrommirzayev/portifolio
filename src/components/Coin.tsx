import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import styles from "./Coin.module.css";

const TILT = 16; // max tilt in degrees
const spring = { stiffness: 140, damping: 16, mass: 0.6 };

interface CoinProps {
  children: ReactNode;
  /** CSS length for the coin's diameter. */
  size: string;
  /** 0 → 1 scroll progress; the coin sinks back and fades as it grows. */
  recede?: MotionValue<number>;
  /** Fly in from depth on mount. */
  intro?: boolean;
  label?: string;
}

/**
 * A 3D coin: a glass face floating over three stacked echo discs. It tilts
 * toward the pointer, the sheen tracks the tilt, and a click spins it.
 */
export function Coin({ children, size, recede, intro = false, label }: CoinProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [lifted, setLifted] = useState(false);

  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);
  const spin = useMotionValue(0);
  const rotateY = useTransform(() => ry.get() + spin.get());

  const sheenX = useTransform(ry, [-TILT, TILT], [18, 82]);
  const sheenY = useTransform(rx, [TILT, -TILT], [12, 70]);
  const sheen = useMotionTemplate`radial-gradient(85% 85% at ${sheenX}% ${sheenY}%, oklch(1 0 0 / 0.3), transparent 52%)`;

  // Scroll-driven recede lives on the outer wrapper so the coin keeps its 3D context.
  const fallback = useMotionValue(0);
  const progress = recede ?? fallback;
  const scale = useTransform(progress, [0, 1], [1, 0.7]);
  const y = useTransform(progress, [0, 1], [0, -50]);
  const opacity = useTransform(progress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      ry.set(clamp(dx) * TILT);
      rx.set(-clamp(dy) * TILT);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, rx, ry]);

  const spinOnce = () => {
    if (reduce) return;
    animate(spin, spin.get() + 360, { type: "spring", stiffness: 60, damping: 14 });
  };

  return (
    <motion.div className={styles.outer} style={{ scale, y, opacity, "--coin": size } as unknown as CSSProperties}>
      <motion.div
        className={styles.stage}
        initial={intro && !reduce ? { opacity: 0, scale: 0.55, y: 60 } : false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          ref={ref}
          className={`${styles.coin} ${lifted ? styles.lifted : ""}`}
          style={{ rotateX: rx, rotateY }}
          onPointerEnter={() => setLifted(true)}
          onPointerLeave={() => setLifted(false)}
          onClick={spinOnce}
          role="img"
          aria-label={label}
        >
          <span className={`${styles.echo} ${styles.e3}`} aria-hidden="true" />
          <span className={`${styles.echo} ${styles.e2}`} aria-hidden="true" />
          <span className={`${styles.echo} ${styles.e1}`} aria-hidden="true" />
          <span className={styles.face}>
            {children}
            <motion.span className={styles.sheen} style={{ background: sheen }} aria-hidden="true" />
            <span className={styles.gloss} aria-hidden="true" />
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
