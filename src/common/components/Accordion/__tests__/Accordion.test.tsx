import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import Accordion from '../Accordion';

describe('Accordion', () => {
  it('should render correctly', async () => {
    // ARRANGE
    render(
      <Accordion>
        <Accordion.Item value="section-1" testId="item-section-1">
          <Accordion.Trigger testId="trigger-section-1">Section 1</Accordion.Trigger>
          <Accordion.Content testId="content-section-1">Content for section 1.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="section-2" testId="item-section-2">
          <Accordion.Trigger testId="trigger-section-2">Section 2</Accordion.Trigger>
          <Accordion.Content testId="content-section-2">Content for section 2.</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );
    await screen.findByTestId('accordion');

    // ASSERT
    expect(screen.getByTestId('accordion')).toBeDefined();
  });

  it('should display the default active item', async () => {
    // ARRANGE
    render(
      <Accordion defaultValue={['section-1']}>
        <Accordion.Item value="section-1" testId="item-section-1">
          <Accordion.Trigger testId="trigger-section-1">Section 1</Accordion.Trigger>
          <Accordion.Content testId="content-section-1">Content for section 1.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="section-2" testId="item-section-2">
          <Accordion.Trigger testId="trigger-section-2">Section 2</Accordion.Trigger>
          <Accordion.Content testId="content-section-2">Content for section 2.</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );
    await screen.findByTestId('content-section-1');
    // ASSERT
    expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'open');
  });

  it('should open item when trigger clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Accordion>
        <Accordion.Item value="section-1" testId="item-section-1">
          <Accordion.Trigger testId="trigger-section-1">Section 1</Accordion.Trigger>
          <Accordion.Content testId="content-section-1">Content for section 1.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="section-2" testId="item-section-2">
          <Accordion.Trigger testId="trigger-section-2">Section 2</Accordion.Trigger>
          <Accordion.Content testId="content-section-2">Content for section 2.</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );
    await screen.findByTestId('content-section-1');
    expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'closed');

    // ACT
    await user.click(screen.getByTestId('trigger-section-1-button'));
    await waitFor(() => expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'open'));

    // ASSERT
    expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'open');
  });

  it('should close item when trigger clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Accordion defaultValue={['section-1']}>
        <Accordion.Item value="section-1" testId="item-section-1">
          <Accordion.Trigger testId="trigger-section-1">Section 1</Accordion.Trigger>
          <Accordion.Content testId="content-section-1">Content for section 1.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="section-2" testId="item-section-2">
          <Accordion.Trigger testId="trigger-section-2">Section 2</Accordion.Trigger>
          <Accordion.Content testId="content-section-2">Content for section 2.</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );
    await screen.findByTestId('content-section-1');
    expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'open');

    // ACT
    await user.click(screen.getByTestId('trigger-section-1-button'));
    await waitFor(() => expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'closed'));

    // ASSERT
    expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'closed');
  });

  it('should display multiple active items', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Accordion multiple>
        <Accordion.Item value="section-1" testId="item-section-1">
          <Accordion.Trigger testId="trigger-section-1">Section 1</Accordion.Trigger>
          <Accordion.Content testId="content-section-1">Content for section 1.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="section-2" testId="item-section-2">
          <Accordion.Trigger testId="trigger-section-2">Section 2</Accordion.Trigger>
          <Accordion.Content testId="content-section-2">Content for section 2.</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );
    await screen.findByTestId('content-section-1');
    expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'closed');
    expect(screen.getByTestId('content-section-2')).toHaveAttribute('data-state', 'closed');

    // ACT
    await user.click(screen.getByTestId('trigger-section-1-button'));
    await user.click(screen.getByTestId('trigger-section-2-button'));
    await waitFor(() => expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'open'));

    // ASSERT
    expect(screen.getByTestId('content-section-1')).toHaveAttribute('data-state', 'open');
    expect(screen.getByTestId('content-section-2')).toHaveAttribute('data-state', 'open');
  });
});
