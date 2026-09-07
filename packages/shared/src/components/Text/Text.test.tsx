import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Text } from './Text';

describe('Text', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Text data-testid="text">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <Text className="custom-className" data-testid="text">
        content
      </Text>,
    );
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('custom-className');
  });

  it('should use the default variant', async () => {
    // ARRANGE
    render(<Text data-testid="text">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('text-muted');
  });

  it('should use the specified variant', async () => {
    // ARRANGE
    render(
      <Text variant="danger" data-testid="text">
        content
      </Text>,
    );
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('text-destructive');
  });
});
