import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import SkeletonComponents from './SkeletonComponents';

describe('SkeletonComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SkeletonComponents />);
    await screen.findByTestId('components-skeleton');

    // ASSERT
    expect(screen.getByTestId('components-skeleton')).toBeDefined();
  });
});
