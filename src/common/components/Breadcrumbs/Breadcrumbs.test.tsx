import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Breadcrumbs from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Ellipsis />
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Page</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>,
    );
    await screen.findByTestId('breadcrumbs');

    // ASSERT
    expect(screen.getByTestId('breadcrumbs')).toBeDefined();
  });

  it('should render inner components successfully', async () => {
    // ARRANGE
    render(
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Ellipsis />
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Page</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>,
    );
    await screen.findByTestId('breadcrumbs');

    // ASSERT
    expect(screen.getByTestId('breadcrumbs')).toBeDefined();
    expect(screen.getByTestId('breadcrumbs-list')).toBeDefined();
    expect(screen.getAllByTestId('breadcrumbs-item')).toHaveLength(3);
    expect(screen.getAllByTestId('breadcrumbs-separator')).toHaveLength(2);
    expect(screen.getByTestId('breadcrumbs-ellipsis')).toBeDefined();
    expect(screen.getByTestId('breadcrumbs-page')).toBeDefined();
  });
});
