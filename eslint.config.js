import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        FormData: 'readonly',
        Intl: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        FormData: 'readonly',
      },
    },
  },
];
