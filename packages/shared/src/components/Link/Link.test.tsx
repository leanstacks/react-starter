import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Link from './Link';
import { MemoryRouter } from 'react-router-dom';

describe('Link', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Link to="/" title="title" target="target">
        text
      </Link>,
      { wrapper },
    );
    await screen.findByTestId('link');

    // ASSERT
    expect(screen.getByTestId('link')).toBeDefined();
  });

  it('should use test id', async () => {
    // ARRANGE
    render(
      <Link to="/" title="title" target="target" testId="test">
        text
      </Link>,
      { wrapper },
    );
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });
});
