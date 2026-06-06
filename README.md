# 🍕 Mortadella – landing page

Statikus, mobil-first landing page a **Mortadella** nápolyi pizzás food truck /
kerthelyiség számára. Készült **React + Vite + Tailwind CSS** technológiával,
**backend, adatbázis és API nélkül**. A kész oldal bármilyen statikus tárhelyre
feltölthető (GitHub Pages, Netlify, Vercel, stb.).

---

## 🚀 Gyors indítás

```bash
# 1) Függőségek telepítése
npm install

# 2) Fejlesztői szerver indítása (http://localhost:5173)
npm run dev
```

## 🏗️ Build és előnézet

```bash
# Éles build elkészítése a dist/ mappába
npm run build

# A legyártott dist/ helyi előnézete
npm run preview
```

A `npm run build` után a **`dist/`** mappa tartalma az, amit fel kell tölteni
egy statikus tárhelyre.

---

## 🌐 Deploy

### GitHub Pages (repository alútvonalról)

1. **Állítsd be a `base` értéket** a `vite.config.js` fájlban a repository neved
   alapján. Ha a repód neve pl. `mortadella`, akkor:

   ```js
   // vite.config.js
   base: '/mortadella/',
   ```

   > A `base` az az útvonal, ahol az oldal elérhető lesz:
   > `https://FELHASZNALONEV.github.io/mortadella/`
   > A perjelek (`/.../`) **kötelezőek**! Ha saját domaint vagy gyökér
   > tárhelyet használsz, akkor `base: '/'`.

2. Buildelj:

   ```bash
   npm run build
   ```

3. Töltsd fel a `dist/` mappa tartalmát a GitHub Pages-re. Két gyakori módszer:

   - **Egyszerű (gh-pages branch):**
     ```bash
     npm install --save-dev gh-pages
     ```
     Add hozzá a `package.json` `scripts` részéhez:
     ```json
     "deploy": "npm run build && gh-pages -d dist"
     ```
     Majd:
     ```bash
     npm run deploy
     ```
     Végül a GitHubon: *Settings → Pages → Branch: `gh-pages` / root*.

   - **GitHub Actions:** állítsd be a Pages-t „GitHub Actions” forrásra, és
     használj egy Vite deploy workflow-t (pl. az `actions/deploy-pages`).

### Netlify / Vercel

Itt **nincs alútvonal**, az oldal a domain gyökeréről fut, ezért:

```js
// vite.config.js
base: '/',
```

- **Build command:** `npm run build`
- **Publish / Output directory:** `dist`

---

## ✏️ Mit hol lehet átírni?

A legtöbb tartalom **két helyen** módosítható: a `src/App.jsx` tetején lévő
konfigurációs blokkban és magukban a szekció-komponensekben.

### Facebook link

`src/App.jsx`, a fájl tetején:

```js
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61572116927148'
```

Írd át a saját linkedre – az összes Facebook gomb innen veszi az értéket.
(Minden Facebook link automatikusan **új böngészőfülön** nyílik meg.)

### Nyitási dátum / szöveg

`src/App.jsx`, a fájl tetején:

```js
const OPENING_TEXT = 'Napokon belül nyitunk' // pl. 'Nyitás: 2025. július 1.'
```

Ez jelenik meg a Hero badge-ben és a „Nyitás hamarosan” szekcióban.

### Csapat nevei

`src/App.jsx`, a fájl tetején:

```js
const TEAM = 'Csabi, Timi, Bea, Nikol és Zoli'
```

### Egyéb szövegek

Minden szöveg a `src/App.jsx`-ben, a megfelelő komponensben található
(`Hero`, `About`, `Experience`, `Freedom`, `Atmosphere`, `Opening`,
`FacebookCTA`, `Footer`). Az élmény-kártyák szövegei a `CARDS` tömbben vannak.

### Színek és betűtípusok

`src/index.css`, az `@theme { ... }` blokkban. Minden szín és betűtípus itt egy
helyen állítható:

```css
@theme {
  --font-display: "Fraunces", serif;   /* címek */
  --font-body: "Manrope", sans-serif;  /* szöveg */
  --color-tomato: #c9442e;             /* paradicsompiros */
  --color-olive: #5e6b2b;              /* olívazöld */
  --color-cream: #faf1dd;              /* krém háttér */
  /* ... */
}
```

A betűtípusok importja a `index.html` `<head>` részében lévő Google Fonts
`<link>` sorban van – ha más fontot szeretnél, ott is cseréld le.

### Meta adatok (SEO / Open Graph)

`index.html` `<head>` része: cím, leírás, Open Graph és Twitter tagek. Ha van
saját megosztó képed (1200×630), vedd ki a kommentet az `og:image` sorból.

---

## ➕ Hogyan adj hozzá új szekciót? (étlap, galéria, nyitvatartás)

1. **Hozz létre egy új komponenst** a `src/App.jsx`-ben a többi mintájára, és
   adj neki `id`-t (a navigációhoz):

   ```jsx
   function Menu() {
     const ref = useReveal() // scroll-reveal animációhoz
     return (
       <section id="etlap" ref={ref} className="bg-cream py-24">
         <div className="mx-auto max-w-6xl px-5 sm:px-8" data-reveal>
           <h2 className="font-display text-4xl font-black text-ink">Étlap</h2>
           {/* ... tartalom ... */}
         </div>
       </section>
     )
   }
   ```

   > A `data-reveal` attribútumot kapó elemek finoman „beúsznak”, amikor
   > láthatóvá válnak. Késleltetést a `style={{ '--reveal-delay': '150ms' }}`
   > adhatsz.

2. **Tedd be a `<main>`-be** az `App` komponensben a kívánt sorrendben:

   ```jsx
   <main>
     <Hero />
     <About />
     <Menu />   {/* új szekció */}
     ...
   </main>
   ```

3. **Vedd fel a navigációba** (opcionális) a `NAV_LINKS` tömbben:

   ```js
   const NAV_LINKS = [
     { id: 'rolunk', label: 'Rólunk' },
     { id: 'etlap', label: 'Étlap' }, // új menüpont
     ...
   ]
   ```

   A smooth scroll és a mobil menü ezután automatikusan kezeli az új linket.

**Galéria** esetén tipp: külső kép helyett a meglévő CSS/SVG dekorációkat
(`Pizza`, `Lemon`, `Tomato`, `BasilLeaf`, `Olive`, `Barrel`, `Pond`,
`WineGlass`, `PizzaSlice`) is használhatod, vagy később saját képeket tölthetsz
be a `dist`-be (a `base` útvonalat figyelembe véve).

---

## 📁 Fájlstruktúra

```
mortadella/
├─ index.html          # HTML váz, meta tagek, Google Fonts
├─ package.json        # függőségek és scriptek
├─ vite.config.js      # Vite + React + Tailwind; ITT a base beállítás
├─ src/
│  ├─ main.jsx         # React belépési pont
│  ├─ App.jsx          # az egész oldal (komponensekre bontva)
│  └─ index.css        # Tailwind import + @theme (színek, fontok, animációk)
└─ README.md
```

---

## 🛠️ Technológia

- **React 18** – komponens alapú UI
- **Vite 5** – gyors dev szerver és build
- **Tailwind CSS 4** – a `@tailwindcss/vite` pluginnel (nincs külön
  `tailwind.config.js` / `postcss.config.js`)
- Külső képek, backend, adatbázis és API **nélkül** – minden dekoráció CSS/SVG
- Scroll-reveal animáció saját `IntersectionObserver` hookkal (nincs extra
  függőség)

Jó pizzázást! 🍕🍋🫒🍷
