import type {AnyFn} from '@vueuse/core';
import {createApp} from 'vue';

/**
 * Wraps a composable inside the script setup fn of a Vue app instance.
 * @param composable
 * @returns
 */
export function withSetup(composable: AnyFn) {
  let composableReturnValue: ReturnType<typeof composable>;
  const app = createApp({
    setup() {
      composableReturnValue = composable();
      // suppress missing template warning
      return () => {};
    },
  });
  app.mount(document.createElement('div'));
  return [composableReturnValue, app];
}
