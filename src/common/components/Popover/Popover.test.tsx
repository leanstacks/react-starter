import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import Popover from './Popover';

describe('Popover', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover');

    // ASSERT
    expect(screen.getByTestId('popover')).toBeInTheDocument();
    expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('popover-trigger')).toHaveTextContent(/Open/);
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    expect(screen.getByTestId('popover-content')).toHaveTextContent(/I am the content./);
  });

  it('should handle Popover trigger click', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-trigger');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await screen.findByTestId('popover-content');

    // ASSERT
    expect(screen.getByTestId('popover-content')).toBeVisible();
  });

  it('should show Popover content when trigger is clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-trigger');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await waitFor(() => expect(screen.getByTestId('popover-content')).not.toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('popover-content-backdrop')).not.toHaveClass('hidden');
    expect(screen.getByTestId('popover-content')).not.toHaveClass('hidden');
  });

  it('should hide Popover when backdrop is clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-trigger');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await waitFor(() => expect(screen.getByTestId('popover-content')).not.toHaveClass('hidden'));

    await user.click(screen.getByTestId('popover-content-backdrop'));
    await waitFor(() => expect(screen.getByTestId('popover-content')).toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('popover-content-backdrop')).toHaveClass('hidden');
    expect(screen.getByTestId('popover-content')).toHaveClass('hidden');
  });

  it('should handle default Popover placement', async () => {
    // ARRANGE
    const user = userEvent.setup();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          height: 10,
          width: 20,
          top: 100,
          left: 100,
          right: 120,
          bottom: 110,
          x: 100,
          y: 100,
          toJSON: () => ({}),
        }) as DOMRect,
    );
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-content');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await waitFor(() =>
      expect(screen.getByTestId('popover-content')).toHaveStyle({
        transform: 'translate(100px, 118px)',
      }),
    );

    // ASSERT
    expect(screen.getByTestId('popover-content')).toHaveStyle({
      transform: 'translate(100px, 118px)',
    });
  });

  it('should handle bottom Popover placement', async () => {
    // ARRANGE
    const user = userEvent.setup();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          height: 10,
          width: 20,
          top: 100,
          left: 100,
          right: 120,
          bottom: 110,
          x: 100,
          y: 100,
          toJSON: () => ({}),
        }) as DOMRect,
    );
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content side="bottom">I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-content');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await waitFor(() =>
      expect(screen.getByTestId('popover-content')).toHaveStyle({
        transform: 'translate(100px, 118px)',
      }),
    );

    // ASSERT
    expect(screen.getByTestId('popover-content')).toHaveStyle({
      transform: 'translate(100px, 118px)',
    });
  });

  it('should handle top Popover placement', async () => {
    // ARRANGE
    const user = userEvent.setup();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          height: 10,
          width: 20,
          top: 100,
          left: 100,
          right: 120,
          bottom: 110,
          x: 100,
          y: 100,
          toJSON: () => ({}),
        }) as DOMRect,
    );
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content side="top">I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-content');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await waitFor(() =>
      expect(screen.getByTestId('popover-content')).toHaveStyle({
        transform: 'translate(100px, 82px)',
      }),
    );

    // ASSERT
    expect(screen.getByTestId('popover-content')).toHaveStyle({
      transform: 'translate(100px, 82px)',
    });
  });

  it('should handle left Popover placement', async () => {
    // ARRANGE
    const user = userEvent.setup();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          height: 10,
          width: 20,
          top: 100,
          left: 100,
          right: 120,
          bottom: 110,
          x: 100,
          y: 100,
          toJSON: () => ({}),
        }) as DOMRect,
    );
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content side="left">I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-content');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await waitFor(() =>
      expect(screen.getByTestId('popover-content')).toHaveStyle({
        transform: 'translate(72px, 100px)',
      }),
    );

    // ASSERT
    expect(screen.getByTestId('popover-content')).toHaveStyle({
      transform: 'translate(72px, 100px)',
    });
  });

  it('should handle right Popover placement', async () => {
    // ARRANGE
    const user = userEvent.setup();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          height: 10,
          width: 20,
          top: 100,
          left: 100,
          right: 120,
          bottom: 110,
          x: 100,
          y: 100,
          toJSON: () => ({}),
        }) as DOMRect,
    );
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content side="right">I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-content');

    // ACT
    await user.click(screen.getByTestId('popover-trigger'));
    await waitFor(() =>
      expect(screen.getByTestId('popover-content')).toHaveStyle({
        transform: 'translate(128px, 100px)',
      }),
    );

    // ASSERT
    expect(screen.getByTestId('popover-content')).toHaveStyle({
      transform: 'translate(128px, 100px)',
    });
  });

  it('should use default offset for Popover placement', async () => {
    // ARRANGE
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-content');

    // ASSERT
    expect(screen.getByTestId('popover-content')).toHaveStyle({
      transform: 'translate(0px, 8px)',
    });
  });

  it('should use specified offset for Popover placement', async () => {
    // ARRANGE
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content sideOffset={16}>I am the content.</Popover.Content>
      </Popover>,
    );
    await screen.findByTestId('popover-content');

    // ASSERT
    expect(screen.getByTestId('popover-content')).toHaveStyle({
      transform: 'translate(0px, 16px)',
    });
  });
});
