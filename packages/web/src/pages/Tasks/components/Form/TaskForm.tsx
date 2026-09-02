import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Square, SquareCheckBig } from 'lucide-react';

import { cn } from '@react-starter/shared/utils/css';
import { BaseComponentProps } from '@react-starter/shared/types/components';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@react-starter/shared/components/shadcn/field';
import { Input } from '@react-starter/shared/components/shadcn/input';
import { Button } from '@react-starter/shared/components/shadcn/button';
import { Toggle } from '@react-starter/shared/components/shadcn/toggle';

import { Task } from '@/pages/Tasks/api/useGetUserTasks';

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
 */
const TaskForm = ({ className, onCancel, onSubmit, task, testId = 'task-form' }: TaskFormProps) => {
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
    completed: z.boolean(),
  });

  /**
   * Initializes management of the form.
   */
  const { control, formState, handleSubmit } = useForm<TaskFormValues>({
    defaultValues: {
      userId: task?.userId || 0,
      title: task?.title || '',
      completed: task?.completed || false,
    },
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <div className={cn('max-w-lg', className)} data-testid={testId}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('label.title', { ns: 'tasks' })}</FieldLabel>
                <Input
                  {...field}
                  autoFocus
                  autoComplete="off"
                  maxLength={100}
                  required
                  disabled={formState.isSubmitting}
                  data-testid={`${testId}-input-title`}
                />
                <FieldDescription>Enter a brief description of the task.</FieldDescription>
                {fieldState?.error && <FieldError>{fieldState.error.message}</FieldError>}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="completed"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('label.completed', { ns: 'tasks' })}</FieldLabel>
                <Toggle
                  variant="outline"
                  className="w-fit!"
                  aria-label="Toggle task completion status"
                  pressed={field.value}
                  onPressedChange={(pressed) => field.onChange(pressed)}
                  disabled={formState.isSubmitting}
                  data-testid={`${testId}-input-completed`}
                >
                  <Square className="group-data-[state=on]/toggle:hidden" />
                  <span className="group-data-[state=on]/toggle:hidden">Todo</span>
                  <SquareCheckBig className="group-data-[state=off]/toggle:hidden" />
                  <span className="group-data-[state=off]/toggle:hidden">Done</span>
                </Toggle>
                {fieldState?.error && <FieldError>{fieldState.error.message}</FieldError>}
              </Field>
            )}
          />

          <div className="flex flex-col justify-end gap-8 sm:flex-row sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-40"
              onClick={onCancel}
              disabled={formState.isSubmitting}
              aria-label={t('label.cancel')}
              data-testid={`${testId}-button-cancel`}
            >
              {t('label.cancel')}
            </Button>

            <Button
              type="submit"
              className="w-full sm:w-40"
              disabled={formState.isSubmitting || !formState.isDirty}
              aria-label={t('label.save')}
              data-testid={`${testId}-button-submit`}
            >
              {formState.isSubmitting ? t('label.saving') : t('label.save')}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default TaskForm;
