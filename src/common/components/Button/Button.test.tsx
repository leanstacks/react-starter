import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import Button from './Button';

describe('Button', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Button />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button')).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Button testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('button')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Button className="custom-class" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').classList).toContain('custom-class');
  });

  it('should render Solid variant', async () => {
    // ARRANGE
    render(<Button variant="solid" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').classList).toContain('bg-neutral-700');
  });

  it('should render Outline variant', async () => {
    // ARRANGE
    render(<Button variant="outline" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').classList).toContain('border-neutral-700');
  });

  it('should render Text variant', async () => {
    // ARRANGE
    render(<Button variant="text" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').classList).toContain('border-transparent');
  });

  it('should render Solid variant when variant not specified', async () => {
    // ARRANGE
    render(<Button />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').classList).toContain('bg-neutral-700');
  });

  it('should have default type', async () => {
    // ARRANGE
    render(<Button />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').getAttribute('type')).toBe('button');
  });

  it('should have submit type', async () => {
    // ARRANGE
    render(<Button type="submit" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').getAttribute('type')).toBe('submit');
  });

  it('should have reset type', async () => {
    // ARRANGE
    render(<Button type="reset" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').getAttribute('type')).toBe('reset');
  });

  it('should have default role', async () => {
    // ARRANGE
    render(<Button />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').getAttribute('role')).toBe('button');
  });

  it('should have custom role', async () => {
    // ARRANGE
    render(<Button role="search" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').getAttribute('role')).toBe('search');
  });

  it('should have title', async () => {
    // ARRANGE
    render(<Button title="custom-title" />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').getAttribute('title')).toBe('custom-title');
  });

  it('should be disabled', async () => {
    // ARRANGE
    render(<Button disabled />);
    await screen.findByTestId('button');

    // ASSERT
    expect(screen.getByTestId('button').getAttribute('disabled')).not.toBeNull();
  });

  it('should call click handler function', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const mockClickHandler = vi.fn();

    render(<Button onClick={mockClickHandler} />);
    await screen.findByTestId('button');

    // ACT
    await user.click(screen.getByTestId('button'));

    // ASSERT
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should not call click handler function when disabled', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const mockClickHandler = vi.fn();

    render(<Button onClick={mockClickHandler} disabled />);
    await screen.findByTestId('button');

    // ACT
    await user.click(screen.getByTestId('button'));

    // ASSERT
    expect(mockClickHandler).not.toHaveBeenCalled();
  });
});
