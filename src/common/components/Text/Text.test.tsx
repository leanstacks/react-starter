import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Text from './Text';

describe('Text', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Text>content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Text testId="custom-testId">content</Text>);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<Text className="custom-className">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('custom-className');
  });

  it('should use the default variant', async () => {
    // ARRANGE
    render(<Text>content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('text-cyan-600/80');
  });

  it('should use the specified variant', async () => {
    // ARRANGE
    render(<Text variant="danger">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('text-red-600/80');
  });
});
