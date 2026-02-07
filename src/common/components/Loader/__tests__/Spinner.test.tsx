import { describe, expect, it } from 'vitest';

import { render, screen, waitFor } from 'test/test-utils';

import Spinner from '../Spinner';

describe('Spinner', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Spinner testId="my-spinner" />);
    await screen.findByTestId('my-spinner');

    // ASSERT
    expect(screen.getByTestId('my-spinner')).toBeDefined();
  });

  it('should render default icon', async () => {
    // ARRANGE
    render(<Spinner testId="my-spinner" />);
    await screen.findByTestId('my-spinner');

    // ASSERT
    expect(screen.getByTestId('my-spinner-icon')).toHaveAttribute('data-icon', 'circle-notch');
  });

  it('should render custom icon', async () => {
    // ARRANGE
    render(<Spinner testId="my-spinner" icon={{ icon: 'bars' }} />);
    await waitFor(() => expect(screen.getByTestId('my-spinner-icon')).toHaveAttribute('data-icon', 'bars'));

    // ASSERT
    expect(screen.getByTestId('my-spinner-icon')).toHaveAttribute('data-icon', 'bars');
  });

  it('should render text', async () => {
    // ARRANGE
    render(
      <Spinner testId="my-spinner">
        <Spinner.Text testId="my-spinner-text">loader text</Spinner.Text>
      </Spinner>,
    );
    await screen.findByTestId('my-spinner-text');

    // ASSERT
    expect(screen.getByTestId('my-spinner-text')).toHaveTextContent(/loader text/);
  });
});
