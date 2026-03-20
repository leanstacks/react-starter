import { describe, expect, it } from 'vitest';

import { todosFixture } from '__fixtures__/todos';
import { render, screen } from 'test/test-utils';

import TaskListItem from './TaskListItem';

describe('TaskListItem', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskListItem task={todosFixture[0]} />);
    await screen.findByTestId('list-task-item');

    // ASSERT
    expect(screen.getByTestId('list-task-item')).toBeDefined();
  });
});
