import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Page } from './Page';

describe('Page', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Page data-testid="page">
        <div data-testid="content" />
      </Page>,
    );
    await screen.findByTestId('page');

    // ASSERT
    expect(screen.getByTestId('page')).toBeDefined();
    expect(screen.getByTestId('content')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <Page className="custom-className" data-testid="page">
        <div data-testid="content" />
      </Page>,
    );
    await screen.findByTestId('page');

    // ASSERT
    expect(screen.getByTestId('page').classList).toContain('custom-className');
  });
});
