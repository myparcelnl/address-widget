import {fileURLToPath, URL} from 'node:url';

import {type InputOptions} from 'rollup';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import {isCI} from 'ci-info';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/

const isProd = process.env.NODE_ENV === 'production';
const isPreview = process.env.GENERATE_PREVIEW_HTML === 'true';
// const dirname = new URL('.', import.meta.url).pathname;

const input: InputOptions['input'] = isPreview
  ? {'index.html': 'index.html'}
  : undefined;

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      entryRoot: 'src',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: !isCI && isProd,
    emptyOutDir: true,
    lib: {
      entry: 'src/main.ts',
      fileName: 'main',
      formats: ['es'],
      name: 'MyParcelAddressWidget',
    },
    rollupOptions: {
      external: ['vue'],
      input,
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
});
