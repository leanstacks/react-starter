import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import InputComponents from './InputComponents';

describe('InputComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<InputComponents />);
    await screen.findByTestId('components-input');

    // ASSERT
    expect(screen.getByTestId('components-input')).toBeDefined();
  });

  it('should click buttons', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<InputComponents />);
    await screen.findByTestId('components-input');

    // ACT
    await user.click(screen.getByTestId('reset-1'));
    await user.click(screen.getByTestId('reset-2'));
    await user.click(screen.getByTestId('reset-3'));
    await user.click(screen.getByTestId('reset-4'));

    // ASSERT
    expect(screen.getByTestId('components-input')).toBeDefined();
  });
});
