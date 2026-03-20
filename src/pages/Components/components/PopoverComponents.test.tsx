import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import PopoverComponents from './PopoverComponents';

describe('PopoverComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<PopoverComponents />);
    await screen.findByTestId('components-popover');

    // ASSERT
    expect(screen.getByTestId('components-popover')).toBeDefined();
  });
});
