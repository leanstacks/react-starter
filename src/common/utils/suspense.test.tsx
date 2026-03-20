import { lazy } from 'react';
import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
const Text = lazy(() => import('common/components/Text/Text'));

import { withSuspense } from './suspense';

describe('withSuspense', () => {
  it('should return LoaderSuspense', async () => {
    // ARRANGE
    render(withSuspense(<Text testId="lazy-component">Test</Text>));
    await screen.findByTestId('loader-suspense-fallback');

    // ASSERT
    expect(screen.getByTestId('loader-suspense-fallback')).toBeDefined();
  });
});
