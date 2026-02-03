import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import Input from 'common/components/Form/Input';
import Button from 'common/components/Button/Button';
import Toggle from 'common/components/Form/Toggle';

/**
 * Task form values.
 */
export type TaskFormValues = Pick<Task, 'userId' | 'title' | 'completed'>;

/**
 * Properties for the `TaskForm` component.
 * @param {function} onCancel - Optional. Function invoked when the form is cancelled.
 * @param {function} onSubmit - Optional. Function invoked when the form is
 * successfully submitted.
 * @param {Partial<Task>} [task] - Optional. Task data used to initialize the form.
 * @see {@link BaseComponentProps}
 */
export interface TaskFormProps extends BaseComponentProps {
  onCancel: () => Promise<void> | void;
  onSubmit: (data: TaskFormValues) => Promise<void> | void;
  task?: Partial<Task>;
}

/**
 * The `TaskForm` component renders a form for creating and updating `Task` objects.
 * Form submission and cancellation functions are supplied as props and
 * will be invoked when the respective form button is clicked.
 *
 * @param {TaskFormProps} props - Component properties.
 * @returns JSX
 */
const TaskForm = ({ className, onCancel, onSubmit, task, testId = 'task-form' }: TaskFormProps): JSX.Element => {
  const { t } = useTranslation();

  /**
   * Task form validation schema.
   */
  const schema = z.object({
    userId: z.number().min(1, { message: t('validation.required') }),
    title: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(100, { message: t('validation.max', { count: 100 }) }),
    completed: z.boolean().default(false),
  });

  /**
   * Initializes management of the form.
   */
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      userId: task?.userId || 0,
      title: task?.title || '',
      completed: task?.completed || false,
    },
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <div className={cn('lg:w-2/3 xl:w-1/2', className)} data-testid={testId}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          control={control}
          name="title"
          label={t('label.title', { ns: 'tasks' })}
          className="mb-4"
          autoFocus
          autoComplete="off"
          maxLength={100}
          required
          disabled={formState.isSubmitting}
          testId={`${testId}-input-title`}
        />

        <Toggle
          control={control}
          name="completed"
          label={t('label.completed', { ns: 'tasks' })}
          className="mb-4"
          disabled={formState.isSubmitting}
          testId={`${testId}-input-completed`}
        />

        <div className="my-8 flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-1/2 sm:w-40"
            onClick={onCancel}
            disabled={formState.isSubmitting}
            aria-label={t('label.cancel')}
            testId={`${testId}-button-cancel`}
          >
            {t('label.cancel')}
          </Button>

          <Button
            type="submit"
            className="w-1/2 sm:w-40"
            disabled={formState.isSubmitting || !formState.isDirty}
            aria-label={t('label.save')}
            testId={`${testId}-button-submit`}
          >
            {t('label.save')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
