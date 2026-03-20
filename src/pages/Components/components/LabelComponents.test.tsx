import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import LabelComponents from './LabelComponents';

describe('LabelComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<LabelComponents />);
    await screen.findByTestId('components-label');

    // ASSERT
    expect(screen.getByTestId('components-label')).toBeDefined();
  });
});
