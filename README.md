# Portfolio

Fullstack dasturchi portfoliosi: loyihalar, har bir loyiha sahifasi va rezyume. O‘zbek va ingliz tillarida, yorug‘ va qorong‘i mavzu bilan.

**Stek:** React 19, TypeScript, Vite, React Router (View Transitions), Motion (animatsiyalar), i18next, CSS Modules, lucide-react, Figtree (Fontsource).

## Ishga tushirish

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tip tekshiruvi + dist/ papkaga build
npm run preview   # build natijasini ko‘rish
```

## Tuzilishi

```
src/
  data/        profile.ts (shaxsiy ma’lumotlar), projects.ts, skills.ts
  locales/     uz.ts, en.ts (interfeys matnlari)
  components/  Nav, Footer, Coin (3D tanga), Tile (3D kartochka), CodeModel, ThemeComposer,
               Reveal, ScrollCue, SectionHeader, Devices, IconTile, Placeholder
  pages/       Home, Work, Project, Resume, NotFound
  lib/         useLang, theme (mavzu va asosiy rang)
public/img/    loyiha skrinshotlari
```

Ism, rasm, kontaktlar, ish tajribasi va ta’lim `src/data/profile.ts` faylida. Rasm qo‘shilsa (`photo`), bosh sahifadagi tangada ko‘rinadi. Bo‘sh qiymatlar saytda sariq belgili joy sifatida ko‘rinadi.

## Vercel’ga joylash

`vercel.json` barcha yo‘llarni `index.html` ga yo‘naltiradi, shuning uchun `/work/libapp` kabi havolalar to‘g‘ridan-to‘g‘ri ochiladi.

```bash
npx vercel --prod
```

Yoki repozitoriyani GitHub’ga yuklab, Vercel’da **Add New → Project** orqali import qiling. Vercel Vite loyihasini o‘zi taniydi.
