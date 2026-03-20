import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import CheckboxComponents from './CheckboxComponents';

describe('CheckboxComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<CheckboxComponents />);
    await screen.findByTestId('components-checkbox');

    // ASSERT
    expect(screen.getByTestId('components-checkbox')).toBeDefined();
  });

  it('should click buttons', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<CheckboxComponents />);
    await screen.findByTestId('components-checkbox');

    // ACT
    await user.click(screen.getByTestId('reset-1'));

    // ASSERT
    expect(screen.getByTestId('components-checkbox')).toBeDefined();
  });

  it('should show validation error', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<CheckboxComponents />);
    await screen.findByTestId('checkbox-terms-button');

    // ACT
    // Click the button to check the checkbox
    await user.click(screen.getByTestId('checkbox-terms-button'));
    // Click the button to uncheck the checkbox
    await user.click(screen.getByTestId('checkbox-terms-button'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByTestId('checkbox-terms-error')).toBeDefined();
    });
  });
});
