import { describe, expect, it } from 'vitest';

import { cn } from './css';

describe('css', () => {
  it('should return class names', () => {
    // ARRANGE
    const classes = 'font-mono font-bold text-xl';
    const result = cn(classes);

    // ASSERT
    expect(result).toBe(classes);
  });

  it('should deduplicate class names', () => {
    // ARRANGE
    const classes = 'font-mono font-bold text-xl text-xl';
    const result = cn(classes);

    // ASSERT
    const expected = 'font-mono font-bold text-xl';
    expect(result).toBe(expected);
  });
});
