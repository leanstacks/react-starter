import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Container from './Container';

describe('Container', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Container>
        <div data-testid="children" />
      </Container>,
    );
    await screen.findByTestId('container');

    // ASSERT
    expect(screen.getByTestId('container')).toBeDefined();
    expect(screen.getByTestId('children')).toBeDefined();
  });
});
