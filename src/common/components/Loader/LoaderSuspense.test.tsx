import { lazy } from 'react';
import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
const Text = lazy(() => import('common/components/Text/Text'));

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
