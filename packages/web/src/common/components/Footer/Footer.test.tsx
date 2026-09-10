import { describe, expect, it } from 'vitest';
import { render, screen } from '@/test/test-utils';

import Footer from './Footer';

describe('Footer', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Footer data-testid="footer" />);
    const footer = await screen.findByTestId('footer');

    // ASSERT
    expect(footer).toBeDefined();
  });
});
