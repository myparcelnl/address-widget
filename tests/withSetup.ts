import type {AnyFn} from '@vueuse/core';
import {createApp, type App} from 'vue';

/**
 * Wraps one or more composables inside the setup function of a Vue app instance.
 * @param composables - An array of objects containing the composable functions and their arguments.
 * @returns A tuple containing the results of the composables and the Vue app instance.
 */
export function withSetup<T extends {composable: AnyFn; args?: unknown[]}[]>(
  ...composables: T
): [TupleReturnTypes<T>, App] {
  const results: TupleReturnTypes<T> = [] as TupleReturnTypes<T>;
  const app = createApp({
    setup() {
      results.push(
        ...composables.map(({composable, args}) => composable(...(args || []))),
      );
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
type TupleReturnTypes<
  FunctionType extends {composable: AnyFn; args?: unknown[]}[],
> = {
  [Key in keyof FunctionType]: FunctionType[Key]['composable'] extends (
    ...args: unknown[]
  ) => infer R
    ? R
    : never;
};
