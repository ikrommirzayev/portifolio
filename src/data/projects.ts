import type { Localized, LocalizedList } from "../lib/useLang";

export interface Brand {
  tile: string; // icon tile background
  from: string; // stage gradient start
  to: string; // stage gradient end
  glow: string; // corner glow
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  year: string;
  icon: string;
  brand: Brand;
  client: Localized;
  type: Localized;
  summary: Localized;
  about: LocalizedList;
  built: LocalizedList;
  stack: string[];
  live?: { url: string; label: string };
  /** Domain no longer resolves; screenshots come from running the repo locally. */
  offline?: boolean;
}

export const projects: Project[] = [
  {
    id: "libapp",
    name: "Respublika kutubxonalari platformasi",
    domain: "libapp-one.vercel.app",
    year: "2026",
    icon: "/img/libapp-mark.png",
    brand: { tile: "#F4F5F6", from: "#4E6176", to: "#16222D", glow: "rgb(228 119 98 / .45)" },
    client: { uz: "Respublika Axborot-kutubxona markazi", en: "Republican Information and Library Center" },
    type: { uz: "Davlat veb-platformasi", en: "Government web platform" },
    summary: {
      uz: "Viloyat va tuman kutubxonalari uchun yagona raqamli platforma.",
      en: "A single digital platform for regional and district libraries of Uzbekistan.",
    },
    about: {
      uz: [
        "O‘zbekiston viloyat va tuman kutubxonalarini bitta veb-platformaga birlashtiruvchi loyiha. O‘quvchilar elektron katalog va raqamli kutubxonadan foydalanadi, kitob bron qiladi, tadbirlar va yangiliklarni kuzatadi.",
        "Platforma Next.js’da qurilgan, uch tilda ishlaydi va shaxsiy kabinet orqali foydalanuvchi bilan ishlaydi. Loyiha bosqichma-bosqich ishlab chiqilmoqda.",
      ],
      en: [
        "A project that brings Uzbekistan’s regional and district libraries onto one web platform. Readers use the e-catalogue and digital library, reserve books, and follow events and news.",
        "Built with Next.js, available in three languages, with personal accounts for readers. The platform is being developed in stages.",
      ],
    },
    built: {
      uz: [
        "Uch tilli interfeys: o‘zbek, rus, ingliz",
        "Raqamli kutubxona bo‘limlari: kitoblar, audio, video va elektron katalog",
        "Shaxsiy kabinet: kirish va ro‘yxatdan o‘tish sahifalari",
        "Tadbirlar va yangiliklar bo‘limlari, ma’lumot bo‘lmaganda bo‘sh holat ko‘rsatiladi",
        "Xizmatlar, statistika, FAQ akkordeoni va murojaat formasi",
        "Telefon va planshetga to‘liq moslashgan dizayn",
      ],
      en: [
        "Three-language interface: Uzbek, Russian, English",
        "Digital library sections: books, audio, video and an e-catalogue",
        "Reader accounts: sign-in and registration pages",
        "Events and news sections with designed empty states",
        "Services, statistics, an FAQ accordion and a contact form",
        "Fully responsive layout for phones and tablets",
      ],
    },
    stack: ["Next.js", "React", "i18n (uz / ru / en)", "Responsive UI", "Vercel"],
    live: { url: "https://libapp-one.vercel.app", label: "libapp-one.vercel.app" },
  },
  {
    id: "smartlibrary",
    name: "SmartLibrary",
    domain: "smartlibrary.asia",
    year: "2025",
    icon: "/img/smartlibrary-mark.png",
    brand: { tile: "#F5F5F8", from: "#1E2330", to: "#0B0D14", glow: "rgb(227 6 19 / .45)" },
    client: { uz: "ProInfo MChJ", en: "ProInfo LLC" },
    type: { uz: "Korporativ platforma", en: "Corporate platform" },
    summary: {
      uz: "Kutubxonalar uchun RFID texnologiyalarini taqdim etuvchi platforma.",
      en: "Web platform promoting RFID technology for libraries.",
    },
    about: {
      uz: [
        "ProInfo kompaniyasining kutubxonalar uchun RFID yechimlarini taqdim etuvchi platformasi. Sayt mahsulotlar, yechimlar va resurslarni ko‘rsatadi, amalga oshirilgan kutubxona loyihalarini namoyish etadi va mijozdan ariza qabul qiladi.",
        "Next.js asosida qurilgan, ko‘p tilli va mobil qurilmalarga moslashgan.",
      ],
      en: [
        "ProInfo’s platform for RFID solutions in libraries. It presents products, solutions and resources, showcases completed library installations and takes enquiries from customers.",
        "Built with Next.js, multilingual and fully responsive.",
      ],
    },
    built: {
      uz: [
        "Mahsulotlar, yechimlar, resurslar va kompaniya haqida bo‘limlari",
        "RFID texnologiyasi, avtomatlashtirish, o‘rnatish va o‘qitish xizmatlari sahifalari",
        "Amalga oshirilgan kutubxona loyihalari galereyasi va FAQ",
        "Ariza yuborish oqimi va aloqa bloklari",
        "Ko‘p tilli interfeys va mobil moslashuv",
      ],
      en: [
        "Products, solutions, resources and about sections",
        "Pages for RFID technology, automation, installation and training services",
        "Gallery of completed library installations and an FAQ",
        "Application flow and contact blocks",
        "Multilingual interface and responsive layout",
      ],
    },
    stack: ["Next.js", "React", "i18n", "Responsive UI"],
    live: { url: "https://smartlibrary.asia", label: "smartlibrary.asia" },
  },
  {
    id: "bookfest",
    name: "Tashkent Book Fest IV",
    domain: "tashkentbookfest.uz",
    year: "2024",
    icon: "/img/bookfest-logo.png",
    brand: { tile: "#FFFFFF", from: "#1C5FAE", to: "#0A1A36", glow: "rgb(247 55 95 / .42)" },
    client: { uz: "Axborot va ommaviy kommunikatsiyalar agentligi", en: "Agency of Information and Mass Communications" },
    type: { uz: "Tadbir platformasi", en: "Event platform" },
    summary: {
      uz: "Xalqaro kitob ko‘rgazma-yarmarkasi uchun uch tilli Next.js platformasi.",
      en: "Trilingual Next.js platform for an international book fair.",
    },
    about: {
      uz: [
        "IV Toshkent xalqaro kitob ko‘rgazma-yarmarkasi (O‘zekspomarkaz, 23–25 oktabr 2024) sayti. Tashrifchilar dastur, spikerlar, ishtirokchilar va media materiallarni ko‘radi, nashriyotlar esa stend bron qilish uchun ro‘yxatdan o‘tadi.",
        "Sayt Next.js 14 App Router va TypeScript’da yozilgan. Ishtirokchilar ma’lumoti Prisma orqali PostgreSQL bazasida saqlanadi.",
      ],
      en: [
        "Website for the 4th Tashkent International Book Fair (Uzexpocentre, 23–25 October 2024). Visitors browse the schedule, speakers, exhibitors and media; publishers register to book a stand.",
        "Built on the Next.js 14 App Router with TypeScript. Exhibitor data is stored in PostgreSQL through Prisma.",
      ],
    },
    built: {
      uz: [
        "35 ta sahifa: dastur, spikerlar, tashkilotchilar, ishtirokchilar ro‘yxati, foto, video, FAQ, blog",
        "Uch tilli kontent (o‘zbek, rus, ingliz)",
        "Ishtirokchilar uchun REST API (GET / POST), Prisma ORM va PostgreSQL",
        "React Hook Form + Zod bilan forma validatsiyasi",
        "Ko‘rgazma boshlanishigacha hisoblagich, Swiper slayderlari, lightbox galereya",
        "Tailwind CSS va Radix UI (shadcn/ui) komponentlari",
        "Git orqali jamoada ishlab chiqildi",
      ],
      en: [
        "35 pages: schedule, speakers, organisers, exhibitor list, photos, videos, FAQ, blog",
        "Content in three languages (Uzbek, Russian, English)",
        "Exhibitor REST API (GET / POST) with Prisma ORM and PostgreSQL",
        "Form validation with React Hook Form + Zod",
        "Countdown to opening day, Swiper sliders, lightbox gallery",
        "Tailwind CSS and Radix UI (shadcn/ui) components",
        "Built in a team using Git",
      ],
    },
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form", "Zod", "Prisma", "PostgreSQL", "i18next"],
    offline: true,
  },
  {
    id: "taewoong",
    name: "Taewoong Travel",
    domain: "travelwithtaewoong.com",
    year: "2023",
    icon: "/img/taewoong-mark.png",
    brand: { tile: "#240046", from: "#3A0A6E", to: "#120026", glow: "rgb(255 168 0 / .38)" },
    client: { uz: "Taewoong Travel", en: "Taewoong Travel" },
    type: { uz: "Sayohat agentligi sayti", en: "Travel agency website" },
    summary: {
      uz: "O‘zbekiston bo‘ylab turlar uchun to‘rt tilli sayohat agentligi sayti.",
      en: "Four-language travel agency site for tours across Uzbekistan.",
    },
    about: {
      uz: [
        "Koreyalik va xorijiy sayyohlarga O‘zbekiston bo‘ylab turlar taklif qiladigan agentlik sayti. Bosh sahifa Samarqand, Buxoro va Xiva tasvirlari bilan ochiladi va asosiy yo‘nalishlarga olib boradi.",
        "Sayt Next.js 14’da qurilgan, qidiruv tizimlari uchun moslangan va to‘rt tilda ishlaydi.",
      ],
      en: [
        "Site for an agency offering tours of Uzbekistan to Korean and international travellers. The home page opens on Samarkand, Bukhara and Khiva and leads into the main destinations.",
        "Built with Next.js 14, optimised for search engines and available in four languages.",
      ],
    },
    built: {
      uz: [
        "To‘rt tilli interfeys: o‘zbek, rus, ingliz, koreys",
        "Shaharlar bo‘yicha dinamik galereya sahifalari (gallery/[city])",
        "Yo‘nalishlar katalogi: Registon, Ichan qal’a, Orol dengizi, Qizilqum va Aydarko‘l, Amirsoy",
        "Xizmatlar: aviachiptalar, viza, ko‘chish; mutaxassislar bilan bog‘lanish bloki",
        "Shahar slayderi, AOS animatsiyalari, raqamli hisoblagichlar, video pleer",
        "Git orqali jamoada ishlab chiqildi",
      ],
      en: [
        "Four-language interface: Uzbek, Russian, English, Korean",
        "Dynamic per-city gallery pages (gallery/[city])",
        "Destination catalogue: Registan, Itchan Kala, Aral Sea, Kyzylkum & Aydarkul, Amirsoy",
        "Services: flights, visas, relocation; contact-an-expert block",
        "City hero slider, AOS animations, animated counters, video player",
        "Built in a team using Git",
      ],
    },
    stack: ["Next.js 14", "React 18", "Bootstrap", "Sass", "i18next", "Swiper", "AOS", "React Player"],
    live: { url: "https://taewoong.vercel.app", label: "taewoong.vercel.app" },
  },
];

export const findProject = (id: string | undefined) => projects.find((p) => p.id === id);
