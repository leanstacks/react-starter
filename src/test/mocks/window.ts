import { vi } from 'vitest';

/**
 * Mock `window.matchMedia` to simulate system color scheme preferences.
 * Useful for testing components that respond to light/dark mode settings.
 *
 * @param prefersDark - Whether the system prefers dark mode
 * @example
 * mockMatchMedia(true); // System prefers dark mode
 * mockMatchMedia(false); // System prefers light mode
 */
export function mockMatchMedia(prefersDark: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: prefersDark && query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
