import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen, waitFor } from 'test/test-utils';

import Dialog from './Dialog';

describe('Dialog', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Dialog>
        {({ close }) => (
          <>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Title</Dialog.Title>
                <Dialog.Subtitle>Subtitle</Dialog.Subtitle>
              </Dialog.Header>
              <Dialog.Body>Body</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ButtonBar>
                  <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
                </Dialog.ButtonBar>
              </Dialog.Footer>
            </Dialog.Content>
          </>
        )}
      </Dialog>,
    );
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toBeDefined();
  });

  it('should render successfully with ReactNode children', async () => {
    // ARRANGE
    render(
      <Dialog>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Subtitle>Subtitle</Dialog.Subtitle>
          </Dialog.Header>
          <Dialog.Body>Body</Dialog.Body>
          <Dialog.Footer>
            <Dialog.ButtonBar>
              <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
            </Dialog.ButtonBar>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>,
    );
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toBeDefined();
  });
  it('should be hidden by default', async () => {
    // ARRANGE
    render(
      <Dialog>
        {({ close }) => (
          <>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Title</Dialog.Title>
                <Dialog.Subtitle>Subtitle</Dialog.Subtitle>
              </Dialog.Header>
              <Dialog.Body>Body</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ButtonBar>
                  <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
                </Dialog.ButtonBar>
              </Dialog.Footer>
            </Dialog.Content>
          </>
        )}
      </Dialog>,
    );
    await screen.findByTestId('dialog-content');

    // ASSERT
    expect(screen.getByTestId('dialog-content')).toHaveClass('hidden');
  });

  it('should open when trigger is clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Dialog>
        {({ close }) => (
          <>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Title</Dialog.Title>
                <Dialog.Subtitle>Subtitle</Dialog.Subtitle>
              </Dialog.Header>
              <Dialog.Body>Body</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ButtonBar>
                  <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
                </Dialog.ButtonBar>
              </Dialog.Footer>
            </Dialog.Content>
          </>
        )}
      </Dialog>,
    );
    await screen.findByTestId('dialog-trigger');

    // ACT
    await user.click(screen.getByTestId('dialog-trigger'));

    // ASSERT
    expect(screen.getByTestId('dialog-content')).not.toHaveClass('hidden');
  });

  it('should close when cancel button is clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Dialog>
        {({ close }) => (
          <>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Title</Dialog.Title>
                <Dialog.Subtitle>Subtitle</Dialog.Subtitle>
              </Dialog.Header>
              <Dialog.Body>Body</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ButtonBar>
                  <Dialog.Button onClick={() => close()} testId="dialog-button-cancel">
                    Cancel
                  </Dialog.Button>
                </Dialog.ButtonBar>
              </Dialog.Footer>
            </Dialog.Content>
          </>
        )}
      </Dialog>,
    );
    await screen.findByTestId('dialog-trigger');

    // ACT
    await user.click(screen.getByTestId('dialog-trigger'));
    /* dialog is open */
    await waitFor(() => expect(screen.getByTestId('dialog-content')).not.toHaveClass('hidden'));

    await user.click(screen.getByTestId('dialog-button-cancel'));
    /* dialog is closed */
    await waitFor(() => expect(screen.getByTestId('dialog-content')).toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('dialog-content')).toHaveClass('hidden');
  });

  it('should close when backdrop clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Dialog>
        {({ close }) => (
          <>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Title</Dialog.Title>
                <Dialog.Subtitle>Subtitle</Dialog.Subtitle>
              </Dialog.Header>
              <Dialog.Body>Body</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ButtonBar>
                  <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
                </Dialog.ButtonBar>
              </Dialog.Footer>
            </Dialog.Content>
          </>
        )}
      </Dialog>,
    );
    await screen.findByTestId('dialog-trigger');

    // ACT
    await user.click(screen.getByTestId('dialog-trigger'));
    /* dialog is open */
    await waitFor(() => expect(screen.getByTestId('dialog-content')).not.toHaveClass('hidden'));

    await user.click(screen.getByTestId('dialog-content-backdrop'));
    /* dialog is closed */
    await waitFor(() => expect(screen.getByTestId('dialog-content')).toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('dialog-content')).toHaveClass('hidden');
  });

  it('should not close when dialog content clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Dialog>
        {({ close }) => (
          <>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Title</Dialog.Title>
                <Dialog.Subtitle>Subtitle</Dialog.Subtitle>
              </Dialog.Header>
              <Dialog.Body>Body</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ButtonBar>
                  <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
                </Dialog.ButtonBar>
              </Dialog.Footer>
            </Dialog.Content>
          </>
        )}
      </Dialog>,
    );
    await screen.findByTestId('dialog-trigger');

    // ACT
    await user.click(screen.getByTestId('dialog-trigger'));
    /* dialog is open */
    await waitFor(() => expect(screen.getByTestId('dialog-content')).not.toHaveClass('hidden'));

    await user.click(screen.getByTestId('dialog-body'));

    // ASSERT
    expect(screen.getByTestId('dialog-content')).not.toHaveClass('hidden');
  });
});
