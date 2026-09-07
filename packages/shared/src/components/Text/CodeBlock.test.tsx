import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<CodeBlock code="<></>">{`<></>`}</CodeBlock>);
    await screen.findByTestId('code-snippet');

    // ASSERT
    expect(screen.getByTestId('code-snippet')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<CodeBlock code="<></>" data-testid="custom-testId">{`<></>`}</CodeBlock>);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<CodeBlock code="<></>" className="custom-className">{`<></>`}</CodeBlock>);
    await screen.findByTestId('code-snippet');

    // ASSERT
    expect(screen.getByTestId('code-snippet').classList).toContain('custom-className');
  });

  it('should display code', async () => {
    // ARRANGE
    render(<CodeBlock code="<div>content</div>">{`<div>content</div>`}</CodeBlock>);
    await screen.findByTestId('code-snippet');

    // ASSERT
    expect(screen.getByTestId('code-snippet').textContent).toBe('<div>content</div>');
  });

  it('should use dark theme', async () => {
    // ARRANGE
    render(<CodeBlock code="<></>" theme="dark">{`<></>`}</CodeBlock>);
    const codeElement = await screen.findByTestId('code-snippet');

    // ASSERT
    const preElement = codeElement.querySelector('pre');
    expect(preElement).toBeDefined();
    expect(preElement?.style.background).toBeDefined();
  });
});
