import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DialogComponents from './DialogComponents';
import userEvent from '@testing-library/user-event';

describe('DialogComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DialogComponents />);
    await screen.findByTestId('components-dialog');

    // ASSERT
    expect(screen.getByTestId('components-dialog')).toBeDefined();
  });

  it('should click items', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<DialogComponents />);
    await screen.findByTestId('components-dialog');

    // ACT
    /* exercising click handlers; normally would assert handler function called */
    await user.click(screen.getByTestId('dialog-button-decline'));
    await user.click(screen.getByTestId('dialog-button-accept'));

    // ASSERT
    expect(screen.getByTestId('components-dialog')).toBeDefined();
  });
});
