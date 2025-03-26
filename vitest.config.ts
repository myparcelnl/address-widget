import {fileURLToPath} from 'node:url';
import {
  mergeConfig,
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['./tests/setup.ts'],
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: [
          ...coverageConfigDefaults.exclude,
          '**/*.config.ts',
          '**/*.config.js',
          'src/DemoApp.vue',
          'src/demo.ts',
          '**/*.gen.ts',
        ],
      },
    },
  }),
);
