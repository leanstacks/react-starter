/**
 * @module css
 * @description Utility functions for handling CSS class names, particularly in the context of Tailwind CSS.
 * This module provides a function to conditionally construct `className` strings and merge Tailwind CSS classes without conflicts.
 * It leverages the `clsx` library for conditional class name construction and the `tailwind-merge` library for merging Tailwind CSS classes.
 * @see {@link https://github.com/lukeed/clsx} for `clsx` documentation.
 * @see {@link https://github.com/dcastil/tailwind-merge} for `tailwind-merge` documentation.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditionally construct `className` strings. Merge Tailwind CSS classes
 * without conflicts.
 * @param inputs - Class values used to calculate the `className` value.
 * @returns {string} - A consolidated string containing CSS class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
