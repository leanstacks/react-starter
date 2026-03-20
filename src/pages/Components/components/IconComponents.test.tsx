import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import IconComponents from './IconComponents';

describe('IconComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<IconComponents />);
    await screen.findByTestId('components-icon');

    // ASSERT
    expect(screen.getByTestId('components-icon')).toBeDefined();
  });
});
