import type { Localized } from "../lib/useLang";

export interface Experience {
  role: Localized;
  org: string;
  when: string; // e.g. "2021 — 2024"
  bullets?: { uz: string[]; en: string[] };
}

export interface Education {
  title: Localized;
  org: Localized;
  when: string; // empty → shown as a placeholder
}

export interface Certificate {
  title: string;
  org: string;
  when: string;
}

/**
 * Personal details. Empty values render as highlighted placeholders,
 * so the site is usable before everything is filled in.
 */
export const profile = {
  name: "Ikrom Mirzayev",
  fullName: "Mirzayev Ikrom Mamatkarimovich",
  initials: "IM",
  birthDate: "12.04.1987",
  photo: "/Shaxsiy_surat.jpg", // shown on the hero coin
  telegram: "Ikrom_MM", // Telegram username, without @
  phone: "+998 99 901 21 49",
  email: "ikrom_mirzayev@gmail.com",
  city: { uz: "Toshkent", en: "Tashkent" } satisfies Localized,
  experience: [] as Experience[],
  education: [
    {
      title: { uz: "Axborotlashtirish va kutubxonashunoslik", en: "Informatization and Library Science" },
      org: { uz: "Toshkent axborot texnologiyalari universiteti", en: "Tashkent University of Information Technologies" },
      when: "2007 — 2011",
    },
  ] as Education[],
};

export const certificates: Certificate[] = [
  { title: "The Ultimate React Course: React, Next.js, Redux & More", org: "Udemy", when: "2020" },
];
