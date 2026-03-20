import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import AlertComponents from './AlertComponents';

describe('AlertComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AlertComponents />);
    await screen.findByTestId('components-alert');

    // ASSERT
    expect(screen.getByTestId('components-alert')).toBeDefined();
  });
});
