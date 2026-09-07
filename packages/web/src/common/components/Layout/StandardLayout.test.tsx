import { describe, expect, it } from 'vitest';
import { render, screen } from '@/test/test-utils';

import StandardLayout from './StandardLayout';

// Mock the use-mobile hook to avoid matchMedia issues in tests
vi.mock('@react-starter/shared/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

describe('StandardLayout', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<StandardLayout />);
    await screen.findByTestId('layout-standard');

    // ASSERT
    expect(screen.getByTestId('layout-standard')).toBeDefined();
  });
});
