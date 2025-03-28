import { defineConfig } from 'eslint/config';
import globals from 'globals';
import react from 'eslint-plugin-react';
import jsdoc from 'eslint-plugin-jsdoc';
import js from '@eslint/js';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react,
      jsdoc,
      js,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'jsdoc/check-tag-names': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },
]);
