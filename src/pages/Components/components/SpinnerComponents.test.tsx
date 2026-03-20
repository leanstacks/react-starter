import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import SpinnerComponents from './SpinnerComponents';

describe('SpinnerComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SpinnerComponents />);
    await screen.findByTestId('components-spinner');

    // ASSERT
    expect(screen.getByTestId('components-spinner')).toBeDefined();
  });
});
