import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import Tabs from './Tabs';

describe('Tabs', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tabs');

    // ASSERT
    expect(screen.getByTestId('tabs')).toBeDefined();
  });

  it('should use align start', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List align="start">
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tabs-list');

    // ASSERT
    expect(screen.getByTestId('tabs-list')).toHaveClass('flex');
  });

  it('should use align stretch', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List align="stretch">
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tabs-list');

    // ASSERT
    expect(screen.getByTestId('tabs-list')).toHaveClass('*:grow');
  });

  it('should use default align value', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tabs-list');

    // ASSERT
    expect(screen.getByTestId('tabs-list')).toHaveClass('flex');
  });

  it('should render tab label', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tab-one');

    // ASSERT
    expect(screen.getByTestId('tab-one')).toHaveTextContent(/One/);
  });

  it('should display active state', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tab-one');

    // ASSERT
    expect(screen.getByTestId('tab-one')).toHaveClass('border-blue-300');
  });

  it('should display inactive state', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tab-two');

    // ASSERT
    expect(screen.getByTestId('tab-two')).toHaveClass('border-transparent');
  });

  it('should display default tab', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tab-one');

    // ASSERT
    expect(screen.getByTestId('tab-one')).toHaveClass('border-blue-300');
    expect(screen.getByTestId('tab-two')).toHaveClass('border-transparent');
    expect(screen.getByTestId('content-one')).toHaveClass('block');
    expect(screen.getByTestId('content-two')).toHaveClass('hidden');
  });

  it('should display tab when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" testId="tab-one">
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" testId="tab-two">
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="one" testId="content-one">
          Content One
        </Tabs.Content>
        <Tabs.Content value="two" testId="content-two">
          Content Two
        </Tabs.Content>
      </Tabs>,
    );
    await screen.findByTestId('tabs');
    /* assert tab 1 active */
    expect(screen.getByTestId('tab-one')).toHaveClass('border-blue-300');

    // ACT
    /* click tab two */
    await user.click(screen.getByTestId('tab-two'));
    /* wait for re-render for tab two to be active */
    await waitFor(() => expect(screen.getByTestId('tab-two')).toHaveClass('border-blue-300'));

    // ASSERT
    expect(screen.getByTestId('tab-two')).toHaveClass('border-blue-300');
  });
});
