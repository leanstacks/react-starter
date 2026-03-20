import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import SelectComponents from './SelectComponents';

describe('SelectComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SelectComponents />);
    await screen.findByTestId('components-select');

    // ASSERT
    expect(screen.getByTestId('components-select'));
  });

  it('should click buttons', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<SelectComponents />);
    await screen.findByTestId('components-select');

    // ACT
    await user.click(screen.getByTestId('reset-1'));
    await user.click(screen.getByTestId('reset-2'));
    await user.click(screen.getByTestId('reset-3'));

    // ASSERT
    expect(screen.getByTestId('components-select'));
  });

  it('should select a value', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<SelectComponents />);
    await screen.findByTestId('components-select');

    // ACT
    await user.click(screen.getByTestId('select-trigger-1'));
    await user.click(screen.getByTestId('select-option-1'));

    // ASSERT
    expect(screen.getByTestId('components-select'));
  });
});
