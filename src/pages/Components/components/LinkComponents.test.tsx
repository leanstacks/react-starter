import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import LinkComponents from './LinkComponents';

describe('LinkComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<LinkComponents />);
    await screen.findByTestId('components-link');

    // ASSERT
    expect(screen.getByTestId('components-link')).toBeInTheDocument();
  });
});
