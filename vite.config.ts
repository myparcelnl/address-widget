import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {isCI} from 'ci-info';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/

const isProd = process.env.NODE_ENV === 'production';
// const dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      entryRoot: 'src',
      rollupTypes: true,
    })
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
      entry: 'src/app.ts',
      fileName: 'main',
      formats: ['es', 'cjs'],
      name: 'MyParcelAddressWidget',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  // test: {
  //   setupFiles: [`${dirname}/../../libs/shared/src/__tests__/vitest-setup.ts`],
  // },
})
