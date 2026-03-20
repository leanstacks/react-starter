import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Label from './Label';

describe('Label', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Label>Label Value</Label>);
    await screen.findByTestId('label');

    // ASSERT
    expect(screen.getByTestId('label')).toBeDefined();
  });

  it('should display label text', async () => {
    // ARRANGE
    const value = 'Text';
    render(<Label>{value}</Label>);
    await screen.findByTestId('label');

    // ASSERT
    expect(screen.getByTestId('label')).toHaveTextContent(value);
  });

  it('should display required label', async () => {
    // ARRANGE
    const value = 'Text';
    render(<Label required>{value}</Label>);
    await screen.findByTestId('label');

    // ASSERT
    const label = screen.getByTestId('label');
    expect(label).toHaveTextContent(value);
    expect(label).toHaveClass('font-bold');
    expect(label).toHaveClass('after:content-["*"]');
  });
});
