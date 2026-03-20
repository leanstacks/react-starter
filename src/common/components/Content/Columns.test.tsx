import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Columns from './Columns';

describe('Columns', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Columns>
        <Columns.Column>One</Columns.Column>
        <Columns.Column>Two</Columns.Column>
      </Columns>,
    );
    await screen.findByTestId('columns');

    // ASSERT
    expect(screen.getByTestId('columns')).toBeDefined();
    expect(screen.getAllByTestId('column')).toHaveLength(2);
  });
});
