import {fileURLToPath, URL} from 'node:url';

import {type InputOptions} from 'rollup';
import {defineConfig, LibraryFormats} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import {isCI} from 'ci-info';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/

const isProd = process.env.NODE_ENV === 'production';
const isPreview = process.env.GENERATE_PREVIEW_HTML === 'true';

// When running the build command with GENERATE_PREVIEW_HTML=true, also generate an index.html, which is not nessecary for production library builds.
const rollupInput: InputOptions['input'] = isPreview
  ? {'index.html': 'index.html'}
  : undefined;

// When formatting the index.html for preview builds, the script tag points to the umd build incorrectly. As a workaround, we use the es build for preview builds.
const formats: LibraryFormats[] = isPreview ? ['es'] : ['es', 'umd', 'iife'];

export default defineConfig({
  base:
    isProd && isCI && !process.env.NETLIFY && !process.env.CF_PAGES
      ? '/address-widget/'
      : '/',
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      entryRoot: 'src',
      rollupTypes: false,
      insertTypesEntry: true,
    }),
    tailwindcss(),
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
      formats,
      name: 'MyParcelAddressWidget',
    },
    rollupOptions: {
      external: ['vue'],
      input: rollupInput,
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
