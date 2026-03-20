import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import RadioGroupComponents from './RadioGroupComponents';

describe('RadioGroupComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<RadioGroupComponents />);
    await screen.findByTestId('components-radio-group');

    // ASSERT
    expect(screen.getByTestId('components-radio-group')).toBeInTheDocument();
  });

  it('should click buttons', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<RadioGroupComponents />);
    await screen.findByTestId('components-radio-group');

    // ACT
    await user.click(screen.getByTestId('reset-1'));
    await user.click(screen.getByTestId('reset-2'));
    await user.click(screen.getByTestId('reset-3'));
    await user.click(screen.getByTestId('reset-4'));
    await user.click(screen.getByTestId('reset-5'));
    await user.click(screen.getByTestId('reset-6'));

    // ASSERT
    expect(screen.getByTestId('components-radio-group')).toBeInTheDocument();
  });

  it('should display validation message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<RadioGroupComponents />);
    await screen.findByTestId('radio-group-1');

    // ACT
    const greenOption = screen.getByTestId('color-green-1');
    await user.click(greenOption);

    // ASSERT
    const error = screen.getByTestId('radio-group-1-error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(/Must be a primary color/i);
  });
});
