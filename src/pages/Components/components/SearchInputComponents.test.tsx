import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';

import SearchInputComponents from './SearchInputComponents';

describe('SearchInputComponents', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<SearchInputComponents />);
    await screen.findByTestId('components-search-input');

    // ASSERT
    expect(screen.getByTestId('components-search-input'));
  });

  it('should filter results', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<SearchInputComponents />);
    await screen.findByTestId('input-search');

    // ACT
    await user.type(screen.getByTestId('input-search-input'), 'blue');

    // ASSERT
    expect(screen.getByTestId('search-result-Blue')).toBeDefined();
  });

  it('should click result', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<SearchInputComponents />);
    await screen.findByTestId('input-search-input');

    // ACT
    await user.type(screen.getByTestId('input-search-input'), 'blue');
    await screen.findByTestId('search-result-Blue');
    await user.click(screen.getByTestId('search-result-Blue'));

    // ASSERT
    expect(screen.getByTestId('components-search-input-value-selected')).toHaveTextContent(/Blue/);
  });

  it('should show error message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<SearchInputComponents />);
    await screen.findByTestId('input-search');

    // ACT
    await user.type(screen.getByTestId('input-search-input'), 'not found');

    // ASSERT
    expect(screen.getByTestId('input-search-error')).toBeDefined();
  });
});
