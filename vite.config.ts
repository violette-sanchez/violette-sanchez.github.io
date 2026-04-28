import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          projets: path.resolve(__dirname, 'projets.html'),
          galerie: path.resolve(__dirname, 'galerie.html'),
          apropos: path.resolve(__dirname, 'a-propos.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          p1: path.resolve(__dirname, 'projet-P1.html'),
          p2: path.resolve(__dirname, 'projet-P2.html'),
          p3: path.resolve(__dirname, 'projet-P3.html'),
          p4: path.resolve(__dirname, 'projet-P4.html'),
          p5: path.resolve(__dirname, 'projet-P5.html'),
          p6: path.resolve(__dirname, 'projet-P6.html'),
          p7: path.resolve(__dirname, 'projet-P7.html'),
          p8: path.resolve(__dirname, 'projet-P8.html'),
          p9: path.resolve(__dirname, 'projet-P9.html'),
          p10: path.resolve(__dirname, 'projet-P10.html'),
        },
      },
    },
  };
});
