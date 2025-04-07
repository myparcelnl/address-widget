import type {AnyFn} from '@vueuse/core';
import {createApp, type App} from 'vue';

/**
 * Wraps one or more composables inside the setup function of a Vue app instance.
 * @param composables - An array of composable functions to be executed.
 * @returns A tuple containing the results of the composables and the Vue app instance.
 */
export function withSetup<T extends AnyFn[]>(
  ...composables: T
): [TupleReturnTypes<T>, App] {
  const results: TupleReturnTypes<T> = [] as TupleReturnTypes<T>;
  const app = createApp({
    setup() {
      results.push(...composables.map((composable) => composable()));
      // Suppress missing template warning
      return () => {};
    },
  });
  app.mount(document.createElement('div'));
  return [results, app];
}

/**
 * Utility type to infer the return types of a tuple of functions.
 */
type TupleReturnTypes<FunctionType extends AnyFn[]> = {
  [ArrayIndex in keyof FunctionType]: FunctionType[ArrayIndex] extends (
    ...args: unknown[]
  ) => infer ReturnType
    ? ReturnType
    : never;
};
