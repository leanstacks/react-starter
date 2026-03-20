import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import TextareaComponents from './TextareaComponents';

describe('TextareaComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TextareaComponents />);
    await screen.findByTestId('components-textarea');

    // ASSERT
    expect(screen.getByTestId('components-textarea')).toBeDefined();
  });

  it('should click buttons', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TextareaComponents />);
    await screen.findByTestId('components-textarea');

    // ACT
    await user.click(screen.getByTestId('reset-1'));
    await user.click(screen.getByTestId('reset-2'));
    await user.click(screen.getByTestId('reset-3'));
    await user.click(screen.getByTestId('reset-4'));

    // ASSERT
    expect(screen.getByTestId('components-textarea')).toBeDefined();
  });
});
