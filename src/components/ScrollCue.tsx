import styles from "./ScrollCue.module.css";

/** Three stacked, narrowing bars that pulse downward in sequence. */
export function ScrollCue({ href, label }: { href: string; label: string }) {
  return (
    <a className={styles.cue} href={href} aria-label={label}>
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M3 5h34l-3.4 5.8H6.4L3 5Z" />
        <path d="M10 17.5h20l-3.4 5.8H13.4L10 17.5Z" />
        <path d="M16.8 30h6.4L20 35.6 16.8 30Z" />
      </svg>
    </a>
  );
}
