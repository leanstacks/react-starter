import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import { Alert } from '../alert';

describe('Alert', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Alert />);
    const alert = await screen.findByRole('alert');

    // ASSERT
    expect(alert).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Alert data-testid="custom-testid" />);
    await screen.findByTestId('custom-testid');

    expect(screen.queryByTestId('alert')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Alert className="custom-class" />);
    const alert = await screen.findByRole('alert');

    // ASSERT
    expect(alert.classList).toContain('custom-class');
  });

  it('should render the warning variant', async () => {
    // ARRANGE
    render(<Alert variant="warning" />);
    const alert = await screen.findByRole('alert');

    // ASSERT
    expect(alert.classList).toContain('text-warning');
  });

  it('should render the destructive variant', async () => {
    // ARRANGE
    render(<Alert variant="destructive" />);
    const alert = await screen.findByRole('alert');

    // ASSERT
    expect(alert.classList).toContain('text-destructive');
  });

  it('should render the success variant', async () => {
    // ARRANGE
    render(<Alert variant="success" />);
    const alert = await screen.findByRole('alert');

    // ASSERT
    expect(alert.classList).toContain('text-success');
  });

  it('should render the default variant when variant not specified', async () => {
    // ARRANGE
    render(<Alert />);
    const alert = await screen.findByRole('alert');

    // ASSERT
    expect(alert.classList).toContain('bg-card');
  });

  it('should have role=alert', async () => {
    // ARRANGE
    render(<Alert />);
    const alert = await screen.findByRole('alert');

    // ASSERT
    expect(alert.getAttribute('role')).toBe('alert');
  });
});
