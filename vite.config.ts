/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      __fixtures__: '/src/__fixtures__',
      assets: '/src/assets',
      common: '/src/common',
      pages: '/src/pages',
      test: '/src/test',
    },
  },
  test: {
    coverage: {
      exclude: [
        'storybook-static/**',
        '**/__fixtures__/**',
        '**/__mocks__/**',
        '**/*.stories.*',
        'src/main.tsx',
        'src/test',
        '**/tailwind.config.js',
        ...coverageConfigDefaults.exclude,
      ],
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    mockReset: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
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
