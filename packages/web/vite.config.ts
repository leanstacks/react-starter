/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf('node_modules') > -1) {
            if (id.indexOf('@codemirror') > -1) {
              return 'codemirror';
            }
            if (id.indexOf('@fortawesome') > -1) {
              return 'fortawesome';
            }
            if (id.indexOf('mime-db') > -1) {
              return 'mime-db';
            }
          }
        },
      },
    },
  },
});
