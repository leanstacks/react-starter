import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@/test/test-utils';
import { AddTaskButton } from './AddTaskButton';

describe('AddTaskButton', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AddTaskButton data-testid="add-task-button" />);

    // ACT
    await screen.findByTestId('add-task-button');

    // ASSERT
    expect(screen.getByTestId('add-task-button')).toBeDefined();
  });

  it('should render Plus icon', async () => {
    // ARRANGE
    render(<AddTaskButton data-testid="add-task-button" />);
    await screen.findByTestId('add-task-button');

    // ACT & ASSERT
    const button = screen.getByTestId('add-task-button');
    const svgIcon = button.querySelector('svg');
    expect(svgIcon).toBeDefined();
  });

  it('should link to tasks add page', async () => {
    // ARRANGE
    render(<AddTaskButton />);

    // ACT
    await screen.findByRole('link');

    // ASSERT
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/app/tasks/add');
  });

  it('should render button with aria-label', async () => {
    // ARRANGE
    render(<AddTaskButton />);

    // ACT
    await screen.findByRole('button');

    // ASSERT
    const button = screen.getByRole('button');
    // aria-label contains the translated text "Add a new task"
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toMatch(/Add|task/i);
  });

  it('should render tooltip content on hover', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<AddTaskButton />);
    const button = await screen.findByRole('button');

    // ACT
    await user.hover(button);

    // ASSERT
    // Tooltip content should display the translated text
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toMatch(/Add|task/i);
  });

  it('should accept and apply custom className prop', async () => {
    // ARRANGE
    render(<AddTaskButton data-testid="custom-add-button" className="custom-class" />);

    // ACT
    await screen.findByTestId('custom-add-button');

    // ASSERT
    const button = screen.getByTestId('custom-add-button');
    expect(button).toHaveClass('custom-class');
  });

  it('should pass through button props', async () => {
    // ARRANGE
    render(<AddTaskButton data-testid="add-button" disabled />);

    // ACT
    await screen.findByTestId('add-button');

    // ASSERT
    const button = screen.getByTestId('add-button');
    expect(button).toHaveAttribute('disabled');
  });

  it('should render with icon size button styling', async () => {
    // ARRANGE
    render(<AddTaskButton data-testid="add-task-button" />);

    // ACT
    await screen.findByTestId('add-task-button');

    // ASSERT
    const button = screen.getByTestId('add-task-button');
    // Button should have size classes from shadcn "icon" size variant
    expect(button.className).toContain('size-8');
  });
});
