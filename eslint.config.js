import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['.next/**', 'out/**', 'dist/**', 'coverage/**', 'legacy/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2024, process: 'readonly' },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': next,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      // Props are documented with JSDoc instead of the legacy `prop-types`
      // runtime package, which React 19 no longer ships support for.
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
      'react/self-closing-comp': 'warn',
      // The site serves pre-sized photographs from `public/` through CSS
      // `object-fit` layouts, and every one already sets `loading` and
      // `decoding`. Adopting next/image means revisiting those layouts, which
      // is a deliberate follow-up rather than part of the framework move.
      '@next/next/no-img-element': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
      'object-shorthand': 'warn',
    },
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/test/**/*.{js,jsx}'],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
  },
  {
    files: ['*.config.js', '*.config.mjs', 'src/app/**/*.{js,jsx}', 'scripts/**/*.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  prettier,
];
