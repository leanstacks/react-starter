import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from 'test/test-utils';

import { mockMatchMedia } from 'test/mocks/window';
import Theme from './Theme';

describe('Theme', () => {
  beforeEach(() => {
    // Reset root element classes before each test
    window.document.documentElement.className = '';
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should render successfully with default testId', async () => {
    // ARRANGE
    mockMatchMedia(false); // System prefers light mode
    render(<Theme />);

    // ACT
    await screen.findByTestId('theme');

    // ASSERT
    expect(screen.getByTestId('theme')).toBeDefined();
  });

  it('should render with custom testId', async () => {
    // ARRANGE
    mockMatchMedia(false);
    const customTestId = 'custom-theme-id';
    render(<Theme testId={customTestId} />);

    // ACT
    await screen.findByTestId(customTestId);

    // ASSERT
    expect(screen.getByTestId(customTestId)).toBeDefined();
  });

  it('should apply custom className', async () => {
    // ARRANGE
    mockMatchMedia(false);
    const customClass = 'custom-theme-class';
    const { container } = render(<Theme className={customClass} />);

    // ACT
    await screen.findByTestId('theme');

    // ASSERT
    const themeElement = container.querySelector('[data-testid="theme"]');
    expect(themeElement).toHaveClass(customClass);
  });

  it('should detect system light mode preference when system theme is preferred', async () => {
    // ARRANGE
    mockMatchMedia(false); // System prefers light mode
    render(<Theme />);

    // ACT
    await screen.findByTestId('theme');
    await waitFor(() => {
      expect(window.document.documentElement.classList.contains('light')).toBe(true);
    });

    // ASSERT
    expect(window.document.documentElement.classList.contains('light')).toBe(true);
    expect(window.document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should detect system dark mode preference when system theme is preferred', async () => {
    // ARRANGE
    mockMatchMedia(true); // System prefers dark mode
    render(<Theme />);

    // ACT
    await screen.findByTestId('theme');
    await waitFor(() => {
      expect(window.document.documentElement.classList.contains('dark')).toBe(true);
    });

    // ASSERT
    expect(window.document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.document.documentElement.classList.contains('light')).toBe(false);
  });

  it('should remove previous theme classes before applying new theme', async () => {
    // ARRANGE
    mockMatchMedia(false);
    render(<Theme />);

    // ACT
    await screen.findByTestId('theme');
    await waitFor(() => {
      expect(window.document.documentElement.classList.contains('light')).toBe(true);
    });

    // ASSERT
    // Verify the component properly removes old classes
    expect(window.document.documentElement.classList.contains('light')).toBe(true);
    expect(window.document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should detect system theme preference and apply correct class', async () => {
    // ARRANGE
    mockMatchMedia(true); // System initially prefers dark mode
    render(<Theme defaultTheme="system" />);

    // ACT
    await screen.findByTestId('theme');
    await waitFor(() => {
      expect(window.document.documentElement.classList.contains('dark')).toBe(true);
    });

    // ASSERT
    expect(window.document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.document.documentElement.classList.contains('light')).toBe(false);
  });
});
