import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import { ErrorAlert } from '@react-starter/shared/components/Alert/ErrorAlert';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@react-starter/shared/components/shadcn/field';
import { Input } from '@react-starter/shared/components/shadcn/input';
import { Button } from '@react-starter/shared/components/shadcn/button';

import { useSignin } from '@/pages/Auth/Signin/api/useSignin';

/**
 * Signin form values.
 */

type SigninFormValues = {
  username: string;
  password: string;
};

/**
 * The `SigninForm` component renders a form for user authentication.
 *
 * Upon successful authentication, navigates the user to the authenticated
 * landing page of the application.
 *
 * Upon error, displays messages.
 *
 * @param {BaseComponentProps} props - Component properties.
 */
const SigninForm = ({ className, testId = 'form-signin' }: BaseComponentProps) => {
  const [error, setError] = useState<string>('');
  const { mutate: signin } = useSignin();
  const navigate = useNavigate();
  const { t } = useTranslation();

  /**
   * Signin form validation schema.
   */
  const schema = z.object({
    password: z.string().min(1, { message: t('validation.required') }),
    username: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(30, { message: t('validation.max', { count: 30 }) }),
  });

  /**
   * Initialize management of the form.
   */
  const { control, formState, handleSubmit } = useForm<SigninFormValues>({
    defaultValues: { username: '', password: '' },
    mode: 'all',
    resolver: zodResolver(schema),
  });

  /**
   * Handles the form submission.
   */
  const onFormSubmit = (data: SigninFormValues) => {
    setError('');
    signin(data.username, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err: Error) => {
        setError(err.message);
      },
    });
  };

  return (
    <div className={className} data-testid={testId}>
      {error && (
        <ErrorAlert title="Authentication failed" description={error} className="my-4" testId={`${testId}-error`} />
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <FieldGroup>
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  {...field}
                  autoFocus
                  autoComplete="off"
                  maxLength={30}
                  required
                  disabled={formState.isSubmitting}
                  data-testid={`${testId}-input-username`}
                />
                <FieldDescription>Use any username from JSON Placeholder, e.g. Kamren or Samantha.</FieldDescription>
                {fieldState?.error && <FieldError>{fieldState.error.message}</FieldError>}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  autoComplete="off"
                  maxLength={30}
                  required
                  disabled={formState.isSubmitting}
                  data-testid={`${testId}-input-password`}
                />
                <FieldDescription>Use any password from JSON Placeholder, e.g. "password".</FieldDescription>
                {fieldState?.error && <FieldError>{fieldState.error.message}</FieldError>}
              </Field>
            )}
          />

          <div className="mt-4 flex flex-col justify-end gap-8 sm:flex-row sm:gap-4">
            <Button type="button" variant="outline" className="w-full sm:w-40" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-40"
              disabled={formState.isSubmitting || !formState.isDirty || !formState.isValid}
              data-testid={`${testId}-button-submit`}
            >
              {formState.isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SigninForm;
