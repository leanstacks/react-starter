import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import DropdownComponents from './DropdownComponents';

describe('DropdownComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DropdownComponents />);
    await screen.findByTestId('components-dropdown');

    // ASSERT
    expect(screen.getByTestId('components-dropdown')).toBeDefined();
  });

  it('should click items', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<DropdownComponents />);
    await screen.findByTestId('components-dropdown');

    // ACT
    /* exercising click handlers; normally would assert handler function called */
    await user.click(screen.getByTestId('item-add'));
    await user.click(screen.getByTestId('item-edit'));
    await user.click(screen.getByTestId('item-delete'));
    await user.click(screen.getByTestId('item-send'));

    // ASSERT
    expect(screen.getByTestId('components-dropdown')).toBeDefined();
  });
});
