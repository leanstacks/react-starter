import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import HelpText from './HelpText';

describe('HelpText', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const text = 'HelpText content';
    render(<HelpText>{text}</HelpText>);
    await screen.findByTestId('help-text');

    // ASSERT
    expect(screen.getByTestId('help-text')).toBeDefined();
    expect(screen.getByTestId('help-text')).toHaveTextContent(text);
  });
});
