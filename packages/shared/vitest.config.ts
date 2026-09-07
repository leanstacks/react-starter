import { coverageConfigDefaults, defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

import baseConfig from '../../vitest.config.ts';

/**
 * Vitest configuration for the Web package.
 * Extends the base configuration with web-specific settings.
 */
export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@react-starter/shared': path.resolve(import.meta.dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      mockReset: true,
      setupFiles: './vitest.setup.ts',
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      coverage: {
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['src/components/shadcn/**', ...coverageConfigDefaults.exclude],
      },
    },
  }),
);
