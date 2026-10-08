import type { ReactNode } from "react";
import styles from "./Placeholder.module.css";

/** Highlighted stand-in for profile data that hasn't been filled in yet. */
export function Placeholder({ children }: { children: ReactNode }) {
  return <em className={styles.ph}>{children}</em>;
}

/** Renders the value, or a placeholder when it's empty. */
export function OrPlaceholder({ value, fallback }: { value: string; fallback: string }) {
  return value ? <>{value}</> : <Placeholder>{fallback}</Placeholder>;
}
