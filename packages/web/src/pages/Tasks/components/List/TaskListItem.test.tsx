import { describe, expect, it } from 'vitest';

import { todosFixture } from '@/__fixtures__/todos';
import { render, screen } from '@/test/test-utils';

import { TaskListItem } from './TaskListItem';

describe('TaskListItem', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskListItem task={todosFixture[0]} data-testid="task-list-item" />);
    const task = await screen.findByTestId('task-list-item');

    // ASSERT
    expect(task).toBeDefined();
  });
});
