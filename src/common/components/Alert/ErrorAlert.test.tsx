import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import ErrorAlert from './ErrorAlert';

describe('ErrorAlert', () => {
  const descriptionValue = 'the description text';
  const titleValue = 'the title text';

  it('should render successfully', async () => {
    // ARRANGE
    render(<ErrorAlert description={descriptionValue} />);
    await screen.findByTestId('alert-error');

    // ASSERT
    expect(screen.getByTestId('alert-error')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<ErrorAlert testId="component" description={descriptionValue} />);
    await screen.findByTestId('component');

    // ASSERT
    expect(screen.getByTestId('component')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<ErrorAlert className="class-name" description={descriptionValue} />);
    await screen.findByTestId('alert-error');

    // ASSERT
    expect(screen.getByTestId('alert-error')).toHaveClass('class-name');
  });

  it('should render description', async () => {
    // ARRANGE
    render(<ErrorAlert description={descriptionValue} />);
    await screen.findByTestId('alert-error-description');

    // ASSERT
    expect(screen.getByTestId('alert-error-description')).toHaveTextContent(descriptionValue);
  });

  it('should render title', async () => {
    // ARRANGE
    render(<ErrorAlert title={titleValue} description={descriptionValue} />);
    await screen.findByTestId('alert-error-title');

    // ASSERT
    expect(screen.getByTestId('alert-error-title')).toHaveTextContent(titleValue);
  });

  it('should not render title', async () => {
    // ARRANGE
    render(<ErrorAlert description={descriptionValue} />);
    await screen.findByTestId('alert-error');

    // ASSERT
    expect(screen.queryByTestId('alert-error-title')).toBeNull();
  });
});
