import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import TabsComponents from './TabsComponents';

describe('TabsComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TabsComponents />);
    await screen.findByTestId('components-tabs');

    // ASSERT
    expect(screen.getByTestId('components-tabs')).toBeDefined();
  });
});
