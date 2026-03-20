import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Skeleton />);
    await screen.findByTestId('skeleton');

    // ASSERT
    expect(screen.getByTestId('skeleton')).toBeDefined();
  });

  it('should render custom testId', async () => {
    // ARRANGE
    render(<Skeleton testId="test" />);
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render custom class name', async () => {
    // ARRANGE
    render(<Skeleton className="my-class" />);
    await screen.findByTestId('skeleton');

    // ASSERT
    expect(screen.getByTestId('skeleton').classList).toContain('my-class');
  });
});
