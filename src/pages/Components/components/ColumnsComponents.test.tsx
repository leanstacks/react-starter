import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import ColumnsComponents from './ColumnsComponents';

describe('ColumnsComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ColumnsComponents />);
    await screen.findByTestId('components-columns');

    // ASSERT
    expect(screen.getByTestId('components-columns')).toBeDefined();
  });
});
