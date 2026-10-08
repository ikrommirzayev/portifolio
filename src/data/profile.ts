import type { Localized, LocalizedList } from "../lib/useLang";

export interface Experience {
  role: Localized;
  org: Localized;
  start: string; // year shown on the timeline node
  when: Localized; // e.g. "09.2019 — 02.2021"
  bullets?: LocalizedList;
}

const same = (s: string): Localized => ({ uz: s, en: s });

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
  // Source: electronic employment record (my.gov.uz), plus freelance work since March 2021.
  experience: [
    {
      role: { uz: "Fullstack dasturchi va UI/UX dizayner", en: "Fullstack developer and UI/UX designer" },
      org: { uz: "Frilans, mustaqil faoliyat", en: "Freelance" },
      start: "2021",
      when: { uz: "03.2021 — hozirgacha", en: "03.2021 — present" },
      bullets: {
        uz: [
          "Davlat tashkilotlari va biznes uchun veb-platformalar: Respublika kutubxonalari platformasi (2026), SmartLibrary (2025), Tashkent Book Fest IV (2024), Taewoong Travel (2023)",
          "Frontend: React, Next.js, TypeScript; backend: Node.js, REST API, PostgreSQL",
          "Figma’da UI/UX maketlar va grafik dizayn, ularni moslashuvchan, ko‘p tilli interfeyslarga aylantirish",
          "Git orqali jamoada ishlash, Vercel’da joylashtirish va texnik qo‘llab-quvvatlash",
        ],
        en: [
          "Web platforms for government bodies and businesses: Republican Library Platform (2026), SmartLibrary (2025), Tashkent Book Fest IV (2024), Taewoong Travel (2023)",
          "Frontend: React, Next.js, TypeScript; backend: Node.js, REST APIs, PostgreSQL",
          "UI/UX mockups and graphic design in Figma, built into responsive, multilingual interfaces",
          "Team work with Git, deployment on Vercel and ongoing technical support",
        ],
      },
    },
    {
      role: { uz: "Direktor o‘rinbosari", en: "Deputy Director" },
      org: {
        uz: "Toshkent viloyati O‘rta Chirchiq tumani 50-son umumiy o‘rta ta’lim maktabi",
        en: "School No. 50, Urta Chirchiq district, Tashkent region",
      },
      start: "2019",
      when: same("09.2019 — 02.2021"),
      bullets: { uz: ["Ma’muriy boshqaruv bo‘limi"], en: ["Administrative management"] },
    },
    {
      role: { uz: "Axborot-resurs markazi bo‘limi boshlig‘i", en: "Head of the Information Resource Center" },
      org: { uz: "Sergeli tumani 1-son texnikumi", en: "Technical College No. 1, Sergeli district" },
      start: "2015",
      when: same("08.2015 — 09.2019"),
    },
    {
      role: { uz: "Muhandis-dasturchi → ARM yetakchi mutaxassisi", en: "Software engineer → Lead specialist, Information Resource Center" },
      org: {
        uz: "Kasbiy ta’lim agentligi huzuridagi Kasbiy ta’limni rivojlantirish instituti",
        en: "Institute for Vocational Education Development under the Vocational Education Agency",
      },
      start: "2009",
      when: same("10.2009 — 08.2015"),
      bullets: {
        uz: [
          "2013–2015: Axborot-resurs markazi (ARM) yetakchi mutaxassisi",
          "2012: kompyuter zali mudiri, o‘quv jarayonini axborot texnologiyalari va texnik vositalar bilan ta’minlash bo‘limi",
          "2009–2012: EHM muhandis-dasturchi, Informatika va axborot texnologiyalari bo‘limi",
        ],
        en: [
          "2013–2015: Lead specialist, Information Resource Center",
          "2012: Head of the computer lab, IT and teaching equipment support department",
          "2009–2012: Computer engineer-programmer, Informatics and IT department",
        ],
      },
    },
  ] as Experience[],
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
