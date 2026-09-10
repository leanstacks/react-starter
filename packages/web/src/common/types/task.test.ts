import { describe, it, expect } from 'vitest';

import type { Task } from './task';

describe('Task', () => {
  it('should have the correct properties', () => {
    const task: Task = {
      id: 1,
      userId: 1,
      title: 'Test Task',
      completed: false,
    };

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('userId');
    expect(task).toHaveProperty('title');
    expect(task).toHaveProperty('completed');
  });
});
