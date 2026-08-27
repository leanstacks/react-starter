import { lazy } from 'react';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';
const Text = lazy(() => import('@react-starter/shared/components/Text/Text'));

import LoaderSuspense from './LoaderSuspense';

describe('LoaderSuspense', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <LoaderSuspense>
        <Text testId="lazy-component" />
      </LoaderSuspense>,
    );
    await screen.findByTestId('loader-suspense-fallback');

    // ASSERT
    expect(screen.getByTestId('loader-suspense-fallback')).toBeDefined();
  });
});
