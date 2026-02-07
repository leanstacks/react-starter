import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import DropdownMenu from '../DropdownMenu';

describe('DropdownMenu', () => {
  const mockClickFn = vi.fn();

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu');

    // ASSERT
    expect(screen.getByTestId('dropdown-menu')).toBeDefined();
  });

  it('should have content hidden by default', async () => {
    // ARRANGE
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu-content');

    // ASSERT
    expect(screen.getByTestId('dropdown-menu-content')).toHaveClass('hidden');
  });

  it('should display content when trigger clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu-trigger');

    // ACT
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    await waitFor(() => expect(screen.getByTestId('dropdown-menu-content')).not.toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('dropdown-menu-content')).not.toHaveClass('hidden');
  });

  it('should hide content when backdrop clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu-trigger');

    // ACT
    /* first, open the dropdown menu */
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    await waitFor(() => expect(screen.getByTestId('dropdown-menu-content')).not.toHaveClass('hidden'));
    /* then, click the backdrop */
    await user.click(screen.getByTestId('dropdown-menu-content-backdrop'));
    await waitFor(() => expect(screen.getByTestId('dropdown-menu-content')).toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('dropdown-menu-content')).toHaveClass('hidden');
  });

  it('should display heading', async () => {
    // ARRANGE
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu-heading');

    // ASSERT
    expect(screen.getByTestId('dropdown-menu-heading')).toHaveTextContent(/Heading/);
  });

  it('should display separator', async () => {
    // ARRANGE
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu-separator');

    // ASSERT
    expect(screen.getByTestId('dropdown-menu-separator')).toBeDefined();
  });

  it('should display item', async () => {
    // ARRANGE
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu-item');

    // ASSERT
    expect(screen.getByTestId('dropdown-menu-item')).toHaveTextContent(/Item/);
  });

  it('should call item click function when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={mockClickFn}>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );
    await screen.findByTestId('dropdown-menu-item');

    // ACT
    await user.click(screen.getByTestId('dropdown-menu-item'));
    await waitFor(() => expect(mockClickFn).toHaveBeenCalledTimes(1));

    // ASSERT
    expect(mockClickFn).toHaveBeenCalledTimes(1);
  });
});
