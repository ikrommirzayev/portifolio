import type { Localized } from "../lib/useLang";

export type SkillGroup = "frontend" | "backend" | "design" | "tooling";

type Skill = string | Localized;

export const skills: Record<SkillGroup, Skill[]> = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3 / SCSS", "Tailwind CSS", "Bootstrap", "i18next"],
  backend: ["Node.js", "Express", "REST API", "PostgreSQL", "Prisma ORM", "MongoDB", "Zod"],
  design: ["Figma", "Adobe XD", "Adobe Illustrator", { uz: "Figma → kod", en: "Figma → code" }, "AOS / Swiper"],
  tooling: [{ uz: "Git (jamoaviy ishlash)", en: "Git (team workflow)" }, "Vercel", "npm", { uz: "AI vositalari", en: "AI tools" }],
};

export const skillLabel = (skill: Skill, lang: keyof Localized) =>
  typeof skill === "string" ? skill : skill[lang];
