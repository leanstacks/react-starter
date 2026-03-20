import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Heading from './Heading';

describe('Heading', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Heading />);
    await screen.findByTestId('heading');

    // ASSERT
    expect(screen.getByTestId('heading')).toBeDefined();
  });

  it('should use default level value', async () => {
    // ARRANGE
    render(<Heading />);
    await screen.findByTestId('heading');

    // ASSERT
    expect(screen.getByTestId('heading').nodeName).toBe('H2');
  });

  it('should use specific level value', async () => {
    // ARRANGE
    render(<Heading level={1} />);
    await screen.findByTestId('heading');

    // ASSERT
    expect(screen.getByTestId('heading').nodeName).toBe('H1');
  });
});
