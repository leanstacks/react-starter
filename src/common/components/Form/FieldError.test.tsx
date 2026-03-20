import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import FieldError from './FieldError';

describe('FieldError', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<FieldError message="My Message" />);
    await screen.findByTestId('field-error');

    // ASSERT
    expect(screen.getByTestId('field-error')).toBeDefined();
  });

  it('should display message', async () => {
    // ARRANGE
    render(<FieldError message="My Message" />);
    await screen.findByTestId('field-error');

    // ASSERT
    expect(screen.getByTestId('field-error')).toHaveTextContent('My Message');
  });

  it('should not render when no message', async () => {
    // ARRANGE
    render(
      <div data-testid="wrapper">
        <FieldError message={undefined} />
      </div>,
    );
    await screen.findByTestId('wrapper');

    // ASSERT
    expect(screen.queryByTestId('field-error')).toBeNull();
  });
});
