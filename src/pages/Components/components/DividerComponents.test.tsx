import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DividerComponents from './DividerComponents';

describe('DividerComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DividerComponents />);
    await screen.findByTestId('components-divider');

    // ASSERT
    expect(screen.getByTestId('components-divider')).toBeDefined();
  });
});
