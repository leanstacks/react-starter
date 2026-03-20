import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import ErrorFallback from './ErrorFallback';

describe('ErrorFallback', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ErrorFallback />);
    await screen.findByTestId('error-fallback');

    // ASSERT
    expect(screen.getByTestId('error-fallback')).toBeDefined();
  });
});
