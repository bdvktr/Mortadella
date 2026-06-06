import { useState, useEffect, useRef } from 'react'

/* ============================================================
   KONFIGURÁCIÓ — itt írhatod át a legfontosabb adatokat
   ============================================================ */
const FACEBOOK_URL   = 'https://www.facebook.com/profile.php?id=61572116927148'
const INSTAGRAM_URL  = 'https://www.instagram.com/mortadella_pizza/'
const TIKTOK_URL     = 'https://www.tiktok.com/@mortadella_pizzeria'
const OPENING_TEXT = 'Napokon belül nyitunk' // <- ide jöhet később a pontos dátum
const TEAM = 'Csabi, Timi, Bea, Nikol és Zoli'

const NAV_LINKS = [
  { id: 'rolunk', label: 'Rólunk' },
  { id: 'elmeny', label: 'Élmény' },
  { id: 'hangulat', label: 'Hangulat' },
  { id: 'nyitas', label: 'Nyitás' },
  { id: 'facebook', label: 'Facebook' },
]

/* ============================================================
   SCROLL REVEAL HOOK  (egyszerű IntersectionObserver, nincs függőség)
   ============================================================ */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.hasAttribute('data-reveal')
      ? [el, ...el.querySelectorAll('[data-reveal]')]
      : el.querySelectorAll('[data-reveal]')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((t) => {
      t.classList.add('reveal')
      io.observe(t)
    })
    return () => io.disconnect()
  }, [])
  return ref
}

/* ============================================================
   CSS / SVG DEKORÁCIÓK  (nincs külső kép!)
   ============================================================ */
function Pizza({ className = '', style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden="true">
      {/* tészta szél */}
      <circle cx="60" cy="60" r="56" fill="#e9b96b" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#c98a3a" strokeWidth="2" />
      {/* szósz */}
      <circle cx="60" cy="60" r="44" fill="#c9442e" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#a3301d" strokeWidth="1.5" />
      {/* mozzarella foltok */}
      <circle cx="46" cy="42" r="8" fill="#fbf0d6" opacity="0.92" />
      <circle cx="78" cy="50" r="7" fill="#fbf0d6" opacity="0.92" />
      <circle cx="52" cy="78" r="7" fill="#fbf0d6" opacity="0.92" />
      <circle cx="82" cy="76" r="6" fill="#fbf0d6" opacity="0.92" />
      {/* bazsalikom */}
      <ellipse cx="62" cy="40" rx="5" ry="8" fill="#41702f" transform="rotate(20 62 40)" />
      <ellipse cx="40" cy="62" rx="4.5" ry="7" fill="#41702f" transform="rotate(-30 40 62)" />
      <ellipse cx="74" cy="72" rx="5" ry="8" fill="#4f7d33" transform="rotate(50 74 72)" />
      {/* pepperoni */}
      <circle cx="68" cy="62" r="5.5" fill="#8f2b25" />
      <circle cx="48" cy="54" r="5" fill="#8f2b25" />
    </svg>
  )
}

function Lemon({ className = '', style }) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
      <ellipse cx="40" cy="44" rx="26" ry="22" fill="#efb429" transform="rotate(-25 40 44)" />
      <ellipse cx="40" cy="44" rx="26" ry="22" fill="none" stroke="#cf941a" strokeWidth="1.5" transform="rotate(-25 40 44)" />
      <ellipse cx="32" cy="36" rx="7" ry="4" fill="#f6d469" opacity="0.7" transform="rotate(-25 32 36)" />
      <path d="M55 24 q14 -8 18 4 q-13 4 -18 -4 Z" fill="#5e6b2b" />
      <path d="M58 26 q8 -10 -2 -14" fill="none" stroke="#41702f" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function Tomato({ className = '', style }) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
      <circle cx="40" cy="46" r="26" fill="#c9442e" />
      <circle cx="40" cy="46" r="26" fill="none" stroke="#a3301d" strokeWidth="1.5" />
      <ellipse cx="31" cy="38" rx="6" ry="4" fill="#e07a5f" opacity="0.6" />
      <path d="M40 22 l-7 -8 M40 22 l7 -8 M40 22 l-10 -2 M40 22 l10 -2 M40 22 l0 -10"
        stroke="#5e6b2b" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="40" cy="22" r="3.5" fill="#41702f" />
    </svg>
  )
}

function BasilLeaf({ className = '', style }) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true">
      <path d="M40 8 C58 18 64 44 40 72 C16 44 22 18 40 8 Z" fill="#41702f" />
      <path d="M40 8 C58 18 64 44 40 72 C16 44 22 18 40 8 Z" fill="none" stroke="#2f5722" strokeWidth="1.5" />
      <path d="M40 14 L40 66 M40 28 L52 34 M40 28 L28 34 M40 44 L54 48 M40 44 L26 48"
        stroke="#6c9b4f" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Olive({ className = '', style }) {
  return (
    <svg viewBox="0 0 60 60" className={className} style={style} aria-hidden="true">
      <ellipse cx="30" cy="36" rx="14" ry="18" fill="#5e6b2b" />
      <ellipse cx="30" cy="36" rx="14" ry="18" fill="none" stroke="#41541f" strokeWidth="1.5" />
      <ellipse cx="25" cy="30" rx="3.5" ry="5" fill="#84944a" opacity="0.7" />
      <path d="M30 18 q10 -10 18 -6" fill="none" stroke="#41702f" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="48" cy="13" rx="7" ry="3.5" fill="#5e6b2b" transform="rotate(-20 48 13)" />
    </svg>
  )
}

function WineGlass({ className = '', style }) {
  return (
    <svg viewBox="0 0 60 80" className={className} style={style} aria-hidden="true">
      <path d="M18 8 H42 C42 26 36 34 30 34 C24 34 18 26 18 8 Z" fill="#6e2438" opacity="0.85" />
      <path d="M16 6 H44 C44 28 36 38 30 38 C24 38 16 28 16 6 Z" fill="none" stroke="#3a2a1c" strokeWidth="2" />
      <line x1="30" y1="38" x2="30" y2="66" stroke="#3a2a1c" strokeWidth="2.5" />
      <line x1="16" y1="70" x2="44" y2="70" stroke="#3a2a1c" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function Barrel({ className = '', style }) {
  return (
    <svg viewBox="0 0 120 140" className={className} style={style} aria-hidden="true">
      <path d="M28 24 H92 C100 50 100 90 92 116 H28 C20 90 20 50 28 24 Z" fill="#9c5a2c" />
      <path d="M22 44 C45 38 75 38 98 44 L98 52 C75 46 45 46 22 52 Z" fill="#6e3d1c" />
      <path d="M18 70 C45 64 75 64 102 70 L102 78 C75 72 45 72 18 78 Z" fill="#6e3d1c" />
      <path d="M22 96 C45 90 75 90 98 96 L98 104 C75 98 45 98 22 104 Z" fill="#6e3d1c" />
      <line x1="44" y1="26" x2="40" y2="114" stroke="#7a431f" strokeWidth="3" />
      <line x1="60" y1="24" x2="60" y2="116" stroke="#7a431f" strokeWidth="3" />
      <line x1="76" y1="26" x2="80" y2="114" stroke="#7a431f" strokeWidth="3" />
      <ellipse cx="60" cy="24" rx="32" ry="8" fill="#b5743f" />
    </svg>
  )
}

/* Stilizált halastó kékes folttal + nádak */
function Pond({ className = '', style }) {
  return (
    <svg viewBox="0 0 200 110" className={className} style={style} aria-hidden="true">
      <ellipse cx="100" cy="62" rx="92" ry="40" fill="#5a93a3" />
      <ellipse cx="100" cy="62" rx="92" ry="40" fill="none" stroke="#3f7280" strokeWidth="2" />
      <ellipse cx="78" cy="52" rx="30" ry="10" fill="#7fb3c0" opacity="0.6" />
      <path d="M60 56 q14 6 28 0 M110 66 q14 6 28 0" fill="none" stroke="#cfeaf0" strokeWidth="2" opacity="0.7" />
      {/* tavirózsa */}
      <circle cx="130" cy="58" r="10" fill="#41702f" />
      <circle cx="132" cy="56" r="4" fill="#efb429" />
      {/* nádak */}
      <line x1="40" y1="40" x2="40" y2="18" stroke="#5e6b2b" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="40" cy="14" rx="3.5" ry="8" fill="#7a431f" />
      <line x1="52" y1="44" x2="52" y2="26" stroke="#5e6b2b" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="52" cy="22" rx="3" ry="7" fill="#7a431f" />
    </svg>
  )
}

/* Pizzaszelet a hangulat-szekcióhoz */
function PizzaSlice({ className = '', style }) {
  return (
    <svg viewBox="0 0 120 130" className={className} style={style} aria-hidden="true">
      <path d="M60 6 L112 116 Q60 134 8 116 Z" fill="#e9b96b" />
      <path d="M60 6 L112 116 Q60 134 8 116 Z" fill="none" stroke="#c98a3a" strokeWidth="2" />
      <path d="M60 18 L102 108 Q60 124 18 108 Z" fill="#c9442e" />
      <circle cx="60" cy="60" r="7" fill="#fbf0d6" />
      <circle cx="44" cy="86" r="6" fill="#fbf0d6" />
      <circle cx="78" cy="88" r="6" fill="#fbf0d6" />
      <circle cx="62" cy="98" r="5.5" fill="#8f2b25" />
      <ellipse cx="70" cy="44" rx="5" ry="8" fill="#41702f" transform="rotate(30 70 44)" />
    </svg>
  )
}

/* ============================================================
   NAVIGÁCIÓ — sticky + mobil hamburger
   ============================================================ */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 shadow-[0_6px_24px_-12px_rgba(36,27,16,0.4)] backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
        aria-label="Fő navigáció"
      >
        <a
          href="#hero"
          className="group flex items-center gap-2.5 font-display text-2xl font-black tracking-tight text-tomato"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-tomato transition-transform duration-500 group-hover:rotate-180">
            <Pizza className="h-7 w-7" />
          </span>
          Mortadella
        </a>

        {/* Asztali menü */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="relative font-semibold text-ink-soft transition-colors hover:text-tomato after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-tomato after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-tomato px-5 py-2 font-bold text-cream shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-tomato-deep hover:shadow-lg"
            >
              Kövess minket
            </a>
          </li>
        </ul>

        {/* Hamburger gomb */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-ink md:hidden"
          aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="relative h-5 w-7">
            <span
              className={`absolute left-0 h-0.5 w-7 rounded-full bg-current transition-all duration-300 ${
                open ? 'top-2.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-7 rounded-full bg-current transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-7 rounded-full bg-current transition-all duration-300 ${
                open ? 'top-2.5 -rotate-45' : 'top-5'
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobil menü */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-cream/98 backdrop-blur-sm transition-[max-height,opacity] duration-400 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-lg font-semibold text-ink transition-colors hover:bg-paper hover:text-tomato"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-tomato px-4 py-3 text-center text-lg font-bold text-cream"
            >
              Kövess minket Facebookon
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

/* ============================================================
   1) HERO
   ============================================================ */
function Hero() {
  return (
    <section
      id="hero"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Háttér: meleg mediterrán gradiens */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,#fbecc8_0%,#faf1dd_45%,#f3e6c9_100%)]" />
      {/* Halvány nap / fény folt */}
      <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-lemon/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 -z-10 h-96 w-96 rounded-full bg-olive/20 blur-3xl" />

      {/* Úszó dekorációk */}
      <Pizza
        className="animate-spin-slow pointer-events-none absolute -right-16 top-24 h-44 w-44 opacity-90 sm:right-6 sm:h-56 sm:w-56"
      />
      <Lemon className="animate-float-slow pointer-events-none absolute left-[6%] top-[18%] h-16 w-16" style={{ '--r': '-8deg' }} />
      <Tomato className="animate-float-soft pointer-events-none absolute bottom-[16%] right-[10%] h-14 w-14 sm:h-20 sm:w-20" />
      <BasilLeaf className="animate-float-slow pointer-events-none absolute bottom-[12%] left-[12%] hidden h-16 w-16 sm:block" style={{ '--r': '12deg' }} />
      <Olive className="animate-float-soft pointer-events-none absolute right-[42%] top-[14%] hidden h-12 w-12 sm:block" />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full border border-olive/30 bg-cream/70 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.18em] text-olive" style={{ animationDelay: '0.05s' }}>
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-tomato" />
          {OPENING_TEXT}
        </p>

        <h1
          className="hero-rise font-display text-[clamp(3.4rem,15vw,9rem)] font-black leading-[0.9] tracking-tight text-tomato"
          style={{ animationDelay: '0.15s' }}
        >
          Mortadella
        </h1>

        <p
          className="hero-rise mt-4 max-w-xl font-display text-2xl font-medium italic text-ink sm:text-3xl"
          style={{ animationDelay: '0.3s' }}
        >
          Nápolyi pizza, laza olasz életérzés, kerthelyiségben.
        </p>

        <p
          className="hero-rise mt-5 max-w-lg text-lg leading-relaxed text-ink-soft"
          style={{ animationDelay: '0.45s' }}
        >
          Napokon belül nyitunk – és nem egy fehér terítős éttermet, hanem egy
          igazi olaszos udvart hozunk el neked.
        </p>

        <div
          className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-tomato px-7 py-4 text-lg font-bold text-cream shadow-[0_12px_30px_-10px_rgba(201,68,46,0.7)] transition-all duration-300 hover:-translate-y-1 hover:bg-tomato-deep"
          >
            Kövess minket Facebookon
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#rolunk"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-olive px-7 py-4 text-lg font-bold text-olive transition-all duration-300 hover:bg-olive hover:text-cream"
          >
            Nézd meg, mi vár rád
          </a>
        </div>
      </div>

      {/* Lefelé mutató jel */}
      <a
        href="#rolunk"
        aria-label="Görgess lejjebb"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float-soft text-olive sm:block"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}

/* ============================================================
   2) BEMUTATKOZÓ
   ============================================================ */
function About() {
  const ref = useReveal()
  return (
    <section id="rolunk" ref={ref} className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal>
          <span className="mb-4 inline-block font-display text-lg font-semibold italic text-olive">
            Ciao! Örülünk, hogy itt vagy
          </span>
          <h2 className="font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
            Nem fehér terítős étterem.
            <br />
            <span className="text-tomato">Egy olaszos udvar.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            A Mortadella nem fine dining. Nincsenek frakkos pincérek, nincs
            keményített abrosz, és nincs az a feszengős csend, ahol suttogva
            kérsz még egy szelet kenyeret.
          </p>
          <div className="mt-7 rounded-2xl border-l-4 border-tomato bg-paper/70 p-6">
            <p className="font-display text-xl font-medium italic leading-relaxed text-ink">
              „Ha keményített fehér terítőre és pincéres eleganciára vágysz,
              lehet, hogy nem mi leszünk a te helyed. Ha viszont egy gőzölgő
              nápolyi pizzára, olasz dallamokra és kötetlen udvari hangulatra,
              akkor jó helyen jársz.”
            </p>
          </div>
        </div>

        {/* Dekoratív kollázs */}
        <div className="relative lg:col-span-5" data-reveal style={{ '--reveal-delay': '150ms' }}>
          <div className="relative mx-auto grid aspect-square max-w-sm place-items-center rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_25%,#fbecc8,#f3e6c9)] p-8 shadow-[0_30px_60px_-30px_rgba(36,27,16,0.45)]">
            <div className="dashed-rule absolute inset-4 rounded-[2rem] opacity-40" style={{ background: 'none', border: '2px dashed var(--color-olive-light)' }} />
            <Pizza className="animate-float-soft h-48 w-48 drop-shadow-xl" />
            <Lemon className="animate-float-slow absolute -left-5 top-6 h-16 w-16" />
            <Tomato className="animate-float-soft absolute -right-3 top-16 h-16 w-16" />
            <BasilLeaf className="animate-float-slow absolute -bottom-3 left-10 h-16 w-16" />
            <WineGlass className="animate-float-soft absolute -right-2 bottom-6 h-20 w-16" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   3) ÉLMÉNY KÁRTYÁK
   ============================================================ */
const CARDS = [
  { icon: 'truck', title: 'Food truck rendelés', text: 'A kocsinknál adod le a rendelést. Gyors, közvetlen, semmi ceremónia.' },
  { icon: 'pizza', title: 'Nápolyi stílusú pizza', text: 'Vékony, buborékos szélű, faszénfekete pöttyökkel – ahogy Nápolyban illik.' },
  { icon: 'garden', title: 'Olaszos kerthelyiség', text: 'Mediterrán udvar, ahol leülsz, és máris kicsit Itáliában érzed magad.' },
  { icon: 'tree', title: 'Diófa árnyéka', text: 'A nagy diófa alatt a legforróbb nyári estén is kellemes hűs vár.' },
  { icon: 'pond', title: 'Kis halastó', text: 'Csobogás a háttérben, egy korty ital a kézben. Ennyi kell a nyugalomhoz.' },
  { icon: 'barrel', title: 'Régi hordók', text: 'Állj oda egy öreg hordó mellé pultnak – ez itt a legmenőbb asztal.' },
  { icon: 'wine', title: 'Olasz italok', text: 'Hideg üdítők, olasz nedűk és pár buborékos meglepetés a melegben.' },
  { icon: 'free', title: 'Kötetlen hangulat', text: 'Papírtányér, kézzel evett pizza, jó társaság. Nálunk lazulni jöttél.' },
]

function CardIcon({ name }) {
  const cls = 'h-12 w-12'
  switch (name) {
    case 'pizza': return <Pizza className={cls} />
    case 'truck':
      return (
        <svg viewBox="0 0 64 64" className={cls} aria-hidden="true">
          <rect x="4" y="20" width="34" height="24" rx="3" fill="#c9442e" />
          <path d="M38 28 h12 l8 8 v8 h-20 Z" fill="#efb429" />
          <rect x="6" y="14" width="30" height="8" rx="2" fill="#5e6b2b" />
          <circle cx="16" cy="48" r="6" fill="#241b10" /><circle cx="16" cy="48" r="2.4" fill="#faf1dd" />
          <circle cx="48" cy="48" r="6" fill="#241b10" /><circle cx="48" cy="48" r="2.4" fill="#faf1dd" />
        </svg>
      )
    case 'garden':
      return (
        <svg viewBox="0 0 64 64" className={cls} aria-hidden="true">
          <rect x="6" y="40" width="52" height="6" rx="3" fill="#9c5a2c" />
          <path d="M14 40 V26 a18 18 0 0 1 36 0 V40 Z" fill="#41702f" />
          <path d="M32 8 v8 M20 40 v-10 M44 40 v-10" stroke="#2f5722" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="22" r="3" fill="#efb429" /><circle cx="40" cy="22" r="3" fill="#efb429" />
        </svg>
      )
    case 'tree':
      return (
        <svg viewBox="0 0 64 64" className={cls} aria-hidden="true">
          <rect x="29" y="34" width="6" height="22" rx="2" fill="#7a431f" />
          <circle cx="32" cy="24" r="18" fill="#41702f" />
          <circle cx="20" cy="28" r="9" fill="#4f7d33" /><circle cx="44" cy="28" r="9" fill="#4f7d33" />
          <circle cx="26" cy="20" r="2.5" fill="#84944a" /><circle cx="38" cy="22" r="2.5" fill="#84944a" />
        </svg>
      )
    case 'pond': return <Pond className="h-14 w-20" />
    case 'barrel': return <Barrel className="h-14 w-12" />
    case 'wine': return <WineGlass className="h-14 w-12" />
    case 'free':
      return (
        <svg viewBox="0 0 64 64" className={cls} aria-hidden="true">
          <ellipse cx="32" cy="34" rx="24" ry="9" fill="#faf1dd" stroke="#c98a3a" strokeWidth="2" />
          <ellipse cx="32" cy="32" rx="24" ry="9" fill="#f3e6c9" stroke="#c98a3a" strokeWidth="2" />
          <circle cx="24" cy="31" r="4" fill="#c9442e" /><circle cx="40" cy="33" r="3.5" fill="#41702f" /><circle cx="33" cy="30" r="3" fill="#efb429" />
        </svg>
      )
    default: return <Pizza className={cls} />
  }
}

function Experience() {
  const ref = useReveal()
  return (
    <section id="elmeny" ref={ref} className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl" data-reveal>
          <span className="mb-3 inline-block font-display text-lg font-semibold italic text-tomato">
            Mi vár rád?
          </span>
          <h2 className="font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
            Nyolc apró dolog, amitől nálunk jó lenni
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <article
              key={card.title}
              data-reveal
              style={{ '--reveal-delay': `${(i % 4) * 90}ms` }}
              className="group rounded-3xl border border-sand/70 bg-cream p-7 shadow-[0_10px_30px_-18px_rgba(36,27,16,0.4)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_22px_44px_-20px_rgba(36,27,16,0.55)]"
            >
              <div className="mb-5 grid h-20 w-20 place-items-center rounded-2xl bg-paper transition-transform duration-400 group-hover:scale-105 group-hover:-rotate-3">
                <CardIcon name={card.icon} />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{card.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   4) "NEM FINE DINING. HANEM SZABADSÁG."
   ============================================================ */
function Freedom() {
  const ref = useReveal()
  return (
    <section ref={ref} className="grain relative overflow-hidden bg-olive py-28 text-cream sm:py-36">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-olive-light/40 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-basil/40 blur-3xl" />

      <Lemon className="animate-float-slow pointer-events-none absolute left-[8%] top-[20%] hidden h-20 w-20 opacity-90 sm:block" />
      <BasilLeaf className="animate-float-soft pointer-events-none absolute right-[10%] top-[24%] hidden h-20 w-20 opacity-90 sm:block" />
      <Olive className="animate-float-slow pointer-events-none absolute bottom-[16%] right-[20%] hidden h-16 w-16 sm:block" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8" data-reveal>
        <p className="mb-6 font-display text-xl font-medium italic text-lemon-light">
          Nem fine dining. Hanem szabadság.
        </p>
        <blockquote className="font-display text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
          „Nálunk a papírtányér nem a lustaság,
          <br className="hidden sm:block" /> hanem a{' '}
          <span className="relative inline-block text-lemon">
            szabadság
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 8 Q 50 2 100 7 T 198 5" fill="none" stroke="#efb429" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{' '}
          jele.”
        </blockquote>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
          Edd a pizzát kézzel, ahogy a nápolyiak szokták. De ha jobb szereted,
          kapsz evőeszközt is – nálunk semmi sem kötelező, csak a jó hangulat.
        </p>
      </div>
    </section>
  )
}

/* ============================================================
   5) HANGULAT
   ============================================================ */
function Atmosphere() {
  const ref = useReveal()
  return (
    <section id="hangulat" ref={ref} className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        {/* Szöveg */}
        <div data-reveal>
          <span className="mb-3 inline-block font-display text-lg font-semibold italic text-olive">
            Egy nyári este nálunk
          </span>
          <h2 className="font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
            Csak képzeld el…
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-ink-soft">
            Ülsz a diófa alatt, a háttérben olasz dallamok szólnak, kezedben egy
            szelet gőzölgő pizza, melletted egy hideg olasz ital.
          </p>
          <p className="mt-4 text-xl leading-relaxed text-ink-soft">
            Nem kell feszengeni, nem kell túlkomolyan venni. Csak{' '}
            <span className="font-semibold text-tomato">jó társaság</span>,{' '}
            <span className="font-semibold text-tomato">jó pizza</span> és egy kis{' '}
            <span className="font-semibold text-olive">mediterrán szabadság</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {['🍕 nápolyi pizza', '🍋 citrom', '🫒 olíva', '🍅 paradicsom', '🍷 olasz italok'].map((t) => (
              <span key={t} className="rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink-soft">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dekoratív "udvar" jelenet CSS/SVG elemekből */}
        <div data-reveal style={{ '--reveal-delay': '150ms' }}>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,#bfe0e6_0%,#fbecc8_55%,#e7d3a6_100%)] shadow-[0_30px_70px_-30px_rgba(36,27,16,0.5)]">
            {/* nap */}
            <div className="absolute right-10 top-8 h-16 w-16 rounded-full bg-lemon shadow-[0_0_40px_12px_rgba(239,180,41,0.5)]" />
            {/* diófa */}
            <div className="absolute -left-6 bottom-28 h-40 w-40">
              <div className="absolute left-1/2 top-20 h-24 w-4 -translate-x-1/2 rounded bg-[#7a431f]" />
              <div className="absolute left-2 top-2 h-32 w-32 rounded-full bg-basil" />
              <div className="absolute left-12 top-0 h-24 w-24 rounded-full bg-olive" />
            </div>
            {/* talaj */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#caa86a]" />
            {/* halastó */}
            <Pond className="absolute bottom-3 left-6 w-40" />
            {/* hordó pultnak */}
            <Barrel className="absolute bottom-16 right-10 h-28 w-24 drop-shadow-lg" />
            {/* pizzaszelet a hordón */}
            <PizzaSlice className="animate-float-soft absolute bottom-40 right-12 h-16 w-16 -rotate-12 drop-shadow" />
            {/* borospohár */}
            <WineGlass className="absolute bottom-20 right-28 h-16 w-12" />
            {/* gőz a pizzából */}
            <div className="absolute bottom-56 right-16 h-6 w-1.5 rounded-full bg-white/60" style={{ animation: 'steam 2.6s ease-out infinite' }} />
            <div className="absolute bottom-56 right-20 h-6 w-1.5 rounded-full bg-white/50" style={{ animation: 'steam 2.6s ease-out 0.7s infinite' }} />
            {/* citromok a fűben */}
            <Lemon className="absolute bottom-6 left-2 h-10 w-10" />
            <Lemon className="absolute bottom-2 left-16 h-8 w-8" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   6) NYITÁS HAMAROSAN
   ============================================================ */
function Opening() {
  const ref = useReveal()
  return (
    <section id="nyitas" ref={ref} className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8" data-reveal>
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-tomato/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-tomato">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-tomato" />
          Hamarosan
        </span>
        {/* A pontos dátumot a fenti OPENING_TEXT-ben, vagy itt írhatod át */}
        <h2 className="font-display text-5xl font-black leading-tight text-ink sm:text-7xl">
          {OPENING_TEXT}.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          A pontos nyitási információkért, friss képekért és hírekért kövess
          minket Facebookon – ott jelentkezünk elsőként, amint kinyit a kemence.
        </p>

        <div className="mt-9 flex items-center justify-center gap-4">
          <Tomato className="animate-float-soft h-12 w-12" />
          <Pizza className="animate-spin-slow h-16 w-16" />
          <Lemon className="animate-float-slow h-12 w-12" />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   7) FACEBOOK CTA
   ============================================================ */
function FacebookCTA() {
  const ref = useReveal()
  return (
    <section id="facebook" ref={ref} className="grain relative overflow-hidden bg-tomato py-24 text-cream sm:py-28">
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-tomato-deep/50 blur-3xl" />
      <div className="absolute -bottom-16 left-10 h-72 w-72 rounded-full bg-lemon/20 blur-3xl" />
      <BasilLeaf className="animate-float-slow pointer-events-none absolute left-[8%] top-1/2 hidden h-16 w-16 -translate-y-1/2 opacity-80 sm:block" />
      <Olive className="animate-float-soft pointer-events-none absolute right-[10%] top-[24%] hidden h-14 w-14 opacity-80 sm:block" />

      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8" data-reveal>
        <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
          Ne maradj le a nyitásról!
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
          A friss hírekért, nyitási információkért és képekért kövess minket
          Facebookon.
        </p>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-9 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-lg font-bold text-tomato shadow-[0_14px_34px_-12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
          </svg>
          Irány a Facebook oldal
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  )
}

/* ============================================================
   8) FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="relative bg-ink py-16 text-cream">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <a href="#hero" className="inline-flex items-center gap-3 font-display text-3xl font-black text-cream">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-tomato">
                <Pizza className="h-9 w-9" />
              </span>
              Mortadella
            </a>
            <p className="mt-4 max-w-xs text-cream/70">
              Nápolyi pizza, laza olasz életérzés, kerthelyiségben. Várunk
              szeretettel a Mortadella udvarában!
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-cream/70 transition-colors hover:text-lemon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
                </svg>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/70 transition-colors hover:text-lemon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-cream/70 transition-colors hover:text-lemon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Lábléc navigáció">
            <ul className="flex flex-col items-center gap-3 md:items-start">
              {NAV_LINKS.filter((l) => l.id !== 'facebook').map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-cream/80 transition-colors hover:text-lemon">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition-colors hover:text-lemon"
                >
                  Facebook oldal ↗
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-8 text-center">
          <p className="font-display text-lg italic text-cream/90">
            Várunk szeretettel!
          </p>
          <p className="mt-2 text-sm text-cream/50">
            © {new Date().getFullYear()} Mortadella · Minden jog fenntartva
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   BETÖLTŐ KÉPERNYŐ
   ============================================================ */
function LoadingScreen({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1000)
    const t2 = setTimeout(onDone, 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
      style={fading ? { animation: 'loading-fade-out 0.4s ease-in-out forwards' } : undefined}
    >
      <span
        className="grid h-20 w-20 place-items-center rounded-full bg-tomato"
        style={{ animation: 'loading-spin 1s forwards' }}
      >
        <Pizza className="h-16 w-16" />
      </span>
    </div>
  )
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return <LoadingScreen onDone={() => setLoaded(true)} />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Freedom />
        <Atmosphere />
        <Opening />
        <FacebookCTA />
      </main>
      <Footer />
    </>
  )
}
