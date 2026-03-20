import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import HeadingComponents from './HeadingComponents';

describe('HeadingComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<HeadingComponents />);
    await screen.findByTestId('components-heading');

    // ASSERT
    expect(screen.getByTestId('components-heading')).toBeDefined();
  });
});
