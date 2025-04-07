/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{json,md,yml}": "prettier --write",
  "*.{ts,vue,js,cjs,mjs}": "pnpm run lint:fix"
};
