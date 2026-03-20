import { describe, expect, it } from 'vitest';
import { Navigate, Route, Routes } from 'react-router-dom';

import { render, screen } from 'test/test-utils';

import TasksPageBreadcrumbs from './TasksPageBreadcrumbs';

describe('TasksPageBreadcrumbs', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TasksPageBreadcrumbs />);
    await screen.findByTestId('page-tasks-breadcrumbs');

    // ASSERT
    expect(screen.getByTestId('page-tasks-breadcrumbs')).toBeDefined();
  });

  it('should display breadcrumbs for a task', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/app/tasks" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/add" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId/edit" element={<TasksPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/app/tasks/1" />} />
      </Routes>,
    );
    await screen.findByTestId('page-tasks-breadcrumbs-link-task');

    // ASSERT
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-home')).toBeDefined();
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-tasks')).toBeDefined();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-page-tasks-add')).toBeNull();
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-task')).toBeDefined();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-page-task-edit')).toBeNull();
  });

  it('should display breadcrumbs for the task list', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/app/tasks" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/add" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId/edit" element={<TasksPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/app/tasks" />} />
      </Routes>,
    );
    await screen.findByTestId('page-tasks-breadcrumbs-link-tasks');

    // ASSERT
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-home')).toBeDefined();
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-tasks')).toBeDefined();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-page-tasks-add')).toBeNull();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-link-task')).toBeNull();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-page-task-edit')).toBeNull();
  });

  it('should display breadcrumbs for task add', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/app/tasks" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/add" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId/edit" element={<TasksPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/app/tasks/add" />} />
      </Routes>,
    );
    await screen.findByTestId('page-tasks-breadcrumbs-page-task-add');

    // ASSERT
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-home')).toBeDefined();
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-tasks')).toBeDefined();
    expect(screen.getByTestId('page-tasks-breadcrumbs-page-task-add')).toBeDefined();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-link-task')).toBeNull();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-page-task-edit')).toBeNull();
  });

  it('should display breadcrumbs for task edit', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/app/tasks" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/add" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId" element={<TasksPageBreadcrumbs />} />
        <Route path="/app/tasks/:taskId/edit" element={<TasksPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/app/tasks/1/edit" />} />
      </Routes>,
    );
    await screen.findByTestId('page-tasks-breadcrumbs-link-task');

    // ASSERT
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-home')).toBeDefined();
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-tasks')).toBeDefined();
    expect(screen.queryByTestId('page-tasks-breadcrumbs-page-task-add')).toBeNull();
    expect(screen.getByTestId('page-tasks-breadcrumbs-link-task')).toBeDefined();
    expect(screen.getByTestId('page-tasks-breadcrumbs-page-task-edit')).toBeDefined();
  });
});
