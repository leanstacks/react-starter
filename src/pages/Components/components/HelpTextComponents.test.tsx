import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import HelpTextComponents from './HelpTextComponents';

describe('HelpTextComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<HelpTextComponents />);
    await screen.findByTestId('components-helptext');

    // ASSERT
    expect(screen.getByTestId('components-helptext')).toBeDefined();
  });
});
