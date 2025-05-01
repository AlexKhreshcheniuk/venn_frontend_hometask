import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
// import { configDefaults, defineConfig as defineVitestConfig } from 'vitest/config'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
})
