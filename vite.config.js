import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ============================================================
  //  GITHUB PAGES BEÁLLÍTÁS  ->  itt állítsd be a `base` értéket!
  // ============================================================
  //
  //  • Saját domain / Netlify / Vercel / gyökér tárhely esetén:
  //        base: '/'
  //
  //  • GitHub Pages, repository alútvonalról
  //    (pl. https://felhasznalonev.github.io/mortadella/) esetén
  //    írd ide a REPOSITORY NEVÉT, perjelek közé:
  //        base: '/mortadella/'
  //
  //  Cseréld le a 'mortadella' szót a saját repód nevére!
  // ============================================================
  base: '/Mortadella/',
})
