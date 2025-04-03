export function useOrThrow<T>(
  useComposable: () => T | undefined,
  name: string,
): T {
  const instance = useComposable();
  if (instance == null) {
    throw new Error(
      `'${name}()' must be provided by 'useProvideX()' before using the composable directly. You likely forgot to do this in the setup() function of App.vue.'`,
    );
  }
  return instance;
}
