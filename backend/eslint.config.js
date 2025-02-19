import js from '@eslint/js';
import globals, { es2024 } from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.{ts}'],
    languageOptions: {
      ecmaVersion: es2024,
      globals: globals.node,
      parserOptions: {
        ecmaVersion: '2024',
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
];
