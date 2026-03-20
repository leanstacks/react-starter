import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import TableComponents from './TableComponents';

describe('TableComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TableComponents />);
    await screen.findByTestId('components-table');

    // ASSERT
    expect(screen.getByTestId('components-table')).toBeInTheDocument();
  });
});
