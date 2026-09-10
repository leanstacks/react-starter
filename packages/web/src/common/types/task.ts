/**
 * The `Task` type.
 */
export type Task = {
  // The unique identifier for the task.
  id: number;
  // The identifier of the user who owns the task.
  userId: number;
  // The title of the task.
  title: string;
  // Indicates whether the task is completed.
  completed: boolean;
};
