import { describe, it, expect } from 'vitest';

import { render, screen } from 'test/test-utils';

import AccordionComponents from './AccordionComponents';

describe('AccordionComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AccordionComponents />);
    await screen.findByTestId('components-accordion');

    // ASSERT
    expect(screen.getByTestId('components-accordion')).toBeDefined();
  });
});
