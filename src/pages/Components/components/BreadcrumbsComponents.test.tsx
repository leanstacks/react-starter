import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import BreadcrumbsComponents from './BreadcrumbsComponents';

describe('BreadcrumbsComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<BreadcrumbsComponents />);
    await screen.findByTestId('components-breadcrumbs');

    // ASSERT
    expect(screen.getByTestId('components-breadcrumbs')).toBeDefined();
  });
});
