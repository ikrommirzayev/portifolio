import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";
import styles from "./CodeModel.module.css";

type Tok = [cls: "kw" | "fn" | "tag" | "attr" | "str" | "txt", width: number];

// A sketch of a React component, drawn as coloured token bars rather than text.
const LINES: { indent: number; toks: Tok[] }[] = [
  { indent: 0, toks: [["kw", 6], ["txt", 4], ["kw", 4], ["str", 10]] },
  { indent: 0, toks: [] },
  { indent: 0, toks: [["kw", 6], ["kw", 8], ["fn", 7], ["txt", 6]] },
  { indent: 1, toks: [["kw", 5], ["txt", 3], ["fn", 9], ["txt", 4]] },
  { indent: 1, toks: [["kw", 6], ["txt", 2]] },
  { indent: 2, toks: [["tag", 7], ["attr", 9], ["str", 8]] },
  { indent: 3, toks: [["tag", 4], ["txt", 12], ["tag", 5]] },
  { indent: 3, toks: [["tag", 3], ["txt", 16], ["tag", 4]] },
  { indent: 3, toks: [["tag", 6], ["attr", 5], ["str", 6], ["tag", 2]] },
  { indent: 2, toks: [["tag", 8]] },
  { indent: 1, toks: [["txt", 2]] },
  { indent: 0, toks: [["txt", 1]] },
];

const LINE_STEP = 0.2; // seconds between lines
const PREVIEW_START = LINES.length * LINE_STEP + 0.2;

/** Glass editor floating in 3D: code draws itself, then the page it describes assembles. */
export function CodeModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  let tokIndex = 0;

  return (
    <div ref={ref} className={styles.scene} data-paused={!inView} aria-hidden="true">
      <div className={styles.window}>
        <div className={styles.bar}>
          <i />
          <i />
          <i />
          <span className={styles.tab}>Hero.tsx</span>
          <span className={`${styles.tab} ${styles.tabDim}`}>i18n.ts</span>
        </div>
        <div className={styles.panes}>
          <div className={styles.code}>
            {LINES.map((line, i) => (
              <div key={i} className={styles.line} style={{ "--d": `${i * LINE_STEP}s` } as CSSProperties}>
                <span className={styles.num}>{i + 1}</span>
                <span className={styles.toks} style={{ paddingLeft: `${line.indent * 1.6}ch` }}>
                  {line.toks.map(([cls, w]) => (
                    <span
                      key={tokIndex++}
                      className={`${styles.tok} ${styles[cls]}`}
                      style={{ width: `${w}ch` }}
                    />
                  ))}
                </span>
              </div>
            ))}
            <span className={styles.caret} />
          </div>

          <div className={styles.preview} style={{ "--p": `${PREVIEW_START}s` } as CSSProperties}>
            <div className={`${styles.pv} ${styles.pvNav}`} style={{ "--k": 0 } as CSSProperties}>
              <span className={styles.logo} />
              <span />
              <span />
              <span className={styles.navBtn} />
            </div>
            <div className={`${styles.pv} ${styles.pvTitle}`} style={{ "--k": 1 } as CSSProperties} />
            <div className={`${styles.pv} ${styles.pvTitle} ${styles.short}`} style={{ "--k": 2 } as CSSProperties} />
            <div className={`${styles.pv} ${styles.pvSub}`} style={{ "--k": 3 } as CSSProperties} />
            <div className={`${styles.pv} ${styles.pvBtn}`} style={{ "--k": 4 } as CSSProperties} />
            <div className={styles.cards}>
              {[5, 6, 7].map((k) => (
                <div key={k} className={`${styles.pv} ${styles.card}`} style={{ "--k": k } as CSSProperties} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <span className={`${styles.chip} ${styles.c1}`}>React · Next.js</span>
      <span className={`${styles.chip} ${styles.c2}`}>uz · ru · en</span>
      <span className={`${styles.chip} ${styles.c3}`}>Node.js · PostgreSQL</span>
    </div>
  );
}
