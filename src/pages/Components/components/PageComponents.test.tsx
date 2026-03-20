import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import PageComponents from './PageComponents';

describe('PageComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<PageComponents />);
    await screen.findByTestId('components-page');

    // ASSERT
    expect(screen.getByTestId('components-page')).toBeDefined();
  });
});
