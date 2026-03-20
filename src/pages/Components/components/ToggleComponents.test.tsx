import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import ToggleComponents from './ToggleComponents';

describe('ToggleComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ToggleComponents />);
    await screen.findByTestId('components-toggle');

    // ASSERT
    expect(screen.getByTestId('components-toggle')).toBeDefined();
  });

  it('should click buttons', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<ToggleComponents />);
    await screen.findByTestId('components-toggle');

    // ACT
    await user.click(screen.getByTestId('reset-1'));
    await user.click(screen.getByTestId('reset-2'));
    await user.click(screen.getByTestId('reset-3'));

    // ASSERT
    expect(screen.getByTestId('components-toggle')).toBeDefined();
  });
});
