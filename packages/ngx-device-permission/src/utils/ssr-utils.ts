export function isBrowser(): boolean {
  return typeof window !== 'undefined' && !!window.navigator;
}
