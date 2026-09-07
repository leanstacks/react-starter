import { lazy } from 'react';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/test-utils';
const AboutPage = lazy(() => import('@/pages/About/AboutPage'));

import { withSuspense } from './suspense';

describe('withSuspense', () => {
  it('should return LoaderSuspense', async () => {
    // ARRANGE
    render(withSuspense(<AboutPage />));
    await screen.findByTestId('loader-suspense-fallback');

    // ASSERT
    expect(screen.getByTestId('loader-suspense-fallback')).toBeDefined();
  });
});
