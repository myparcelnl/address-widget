import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {isCI} from 'ci-info';

// https://vite.dev/config/

const isProd = process.env.NODE_ENV === 'production';
// const dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: !isCI && isProd,
    emptyOutDir: false,
    lib: {
      entry: 'src/main.ts',
      fileName: 'main',
      formats: ['es', 'umd'],
      name: 'MyParcelAddressWidget',
    },
  },

  // test: {
  //   setupFiles: [`${dirname}/../../libs/shared/src/__tests__/vitest-setup.ts`],
  // },
})
