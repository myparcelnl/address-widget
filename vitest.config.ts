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
        reporter: ['text', 'json-summary', 'json'],
        reportOnFailure: true,
        thresholds: {
          lines: 80,
          branches: 80,
          functions: 80,
          statements: 80,
        },
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
