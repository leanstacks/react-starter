import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Columns, Column } from './Columns';

describe('Columns', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Columns data-testid="columns">
        <Column data-testid="column">One</Column>
        <Column data-testid="column">Two</Column>
      </Columns>,
    );
    await screen.findByTestId('columns');

    // ASSERT
    expect(screen.getByTestId('columns')).toBeDefined();
    expect(screen.getAllByTestId('column')).toHaveLength(2);
  });
});
