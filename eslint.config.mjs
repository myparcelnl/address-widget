import js from '@eslint/js';
import ts from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";
import pluginVue from 'eslint-plugin-vue'

export default ts.config(
  {
    ignores: [
      "**/*.timestamp-*",
      "**/coverage/",
      "**/dist",
      "**/node_modules",
      "**/tsconfig.json",
      "**/tsconfig.base.json",
      "**/.eslintrc.cjs",
      "release.config.cjs"
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  // Override vue configs
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  eslintConfigPrettier // Keep last - disables rules that conflict with Prettier
);
