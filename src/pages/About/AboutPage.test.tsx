import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';

import AboutPage from './AboutPage';

// Mock the config module
vi.mock('common/utils/config', () => ({
  config: {
    VITE_BUILD_DATE: '2026-07-22',
    VITE_BUILD_TIME: '12:00:00',
    VITE_BUILD_TS: '2026-07-22T12:00:00Z',
    VITE_BUILD_COMMIT_SHA: 'abc123def456',
    VITE_BUILD_ENV_CODE: 'test',
    VITE_BUILD_WORKFLOW_NAME: 'CI/CD Pipeline',
    VITE_BUILD_WORKFLOW_RUN_NUMBER: 42,
    VITE_BUILD_WORKFLOW_RUN_ATTEMPT: 1,
  },
}));

describe('AboutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('page-about');

    // ASSERT
    expect(screen.getByTestId('page-about')).toBeDefined();
  });

  it('should display the page heading', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('page-about');

    // ASSERT
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
  });

  it('should display the build information section heading', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('page-about');

    // ASSERT
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should display the build info table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByTestId('table-build-info')).toBeDefined();
  });

  it('should display build date in the table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByText('07/22/2026')).toBeDefined();
  });

  it('should display build time in the table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByText('12:00:00')).toBeDefined();
  });

  it('should display commit SHA in the table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByText('abc123def456')).toBeDefined();
  });

  it('should display environment code in the table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByText('test')).toBeDefined();
  });

  it('should display workflow name in the table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByText('CI/CD Pipeline')).toBeDefined();
  });

  it('should display workflow run number in the table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByText('42')).toBeDefined();
  });

  it('should display workflow run attempt in the table', async () => {
    // ARRANGE
    render(<AboutPage />);

    // ACT
    await screen.findByTestId('table-build-info');

    // ASSERT
    expect(screen.getByText('1')).toBeDefined();
  });
});
