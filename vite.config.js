import { defineConfig } from 'vite';

export default defineConfig({
  // Menggunakan base relatif agar kompatibel dengan subfolder GitHub Pages (https://username.github.io/repo-name/)
  base: './',
});
