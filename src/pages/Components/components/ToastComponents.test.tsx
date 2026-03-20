import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import ToastComponents from './ToastComponents';

describe('ToastComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ToastComponents />);
    await screen.findByTestId('components-toast');

    // ASSERT
    expect(screen.getByTestId('components-toast')).toBeInTheDocument();
  });

  it('should click buttons', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<ToastComponents />);
    await screen.findByTestId('components-toast');

    // ACT
    await user.click(screen.getByTestId('button-auto-dismiss'));
    await user.click(screen.getByTestId('button-manual-dismiss'));

    // ASSERT
    expect(screen.getByTestId('components-toast')).toBeInTheDocument();
  });
});
