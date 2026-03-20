import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import logo from 'assets/img/logo.png';

import Card from './Card';

describe('Card', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Card>
        <Card.Image src={logo} />
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Subtitle>Subtitle</Card.Subtitle>
        </Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Separator />
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    await screen.findByTestId('card');

    // ASSERT
    expect(screen.getByTestId('card')).toBeDefined();
    expect(screen.getByTestId('card-image')).toBeDefined();
    expect(screen.getByTestId('card-header')).toBeDefined();
    expect(screen.getByTestId('card-title')).toHaveTextContent(/title/i);
    expect(screen.getByTestId('card-subtitle')).toHaveTextContent(/subtitle/i);
    expect(screen.getByTestId('card-body')).toHaveTextContent(/body/i);
    expect(screen.getByTestId('card-separator')).toBeDefined();
    expect(screen.getByTestId('card-footer')).toHaveTextContent(/footer/i);
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Card testId="custom-testId"></Card>);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<Card className="custom-className"></Card>);
    await screen.findByTestId('card');

    // ASSERT
    expect(screen.getByTestId('card').classList).toContain('custom-className');
  });
});
