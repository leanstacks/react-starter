import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

/**
 * Global ESLint configuration for the project.
 */
export default defineConfig([
  {
    ignores: [
      '**/cdk.out/**',
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/shadcn/*.tsx',
      '**/storybook-static/**',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
