import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import ContainerComponents from './ContainerComponents';

describe('ContainerComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ContainerComponents />);
    await screen.findByTestId('components-container');

    // ASSERT
    expect(screen.getByTestId('components-container')).toBeDefined();
  });
});
