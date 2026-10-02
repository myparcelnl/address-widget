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
        include: ['src/**/*.{js,ts,vue}'],
        // @TODO: Raise all thresholds back to 80 once the components have tests.
        thresholds: {
          // Raise thresholds on local runs only, rounded down to whole numbers.
          autoUpdate: process.env.CI ? false : Math.floor,
          lines: 66,
          branches: 53,
          functions: 56,
          statements: 65,
        },
        exclude: [
          ...coverageConfigDefaults.exclude,
          '**/*.config.*',
          'src/DemoApp.vue',
          'src/demo.ts',
          '**/*.gen.ts',
          '**/*.d.ts',
          'tests/**',
        ],
      },
    },
  }),
);
