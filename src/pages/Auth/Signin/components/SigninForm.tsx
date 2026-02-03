import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { useSignin } from '../api/useSignin';
import Input from 'common/components/Form/Input';
import Button from 'common/components/Button/Button';
import ErrorAlert from 'common/components/Alert/ErrorAlert';

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
 * @returns {JSX.Element} JSX
 */
const SigninForm = ({ className, testId = 'form-signin' }: BaseComponentProps): JSX.Element => {
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
    <div className={cn('lg:w-2/3 xl:w-1/2', className)} data-testid={testId}>
      {error && (
        <ErrorAlert title="Authentication failed" description={error} className="mb-4" testId={`${testId}-error`} />
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Input
          control={control}
          name="username"
          label="Username"
          supportingText="Use any username from {JSON}Placeholder, e.g. Kamren or Samantha."
          className="mb-4"
          autoFocus
          autoComplete="off"
          maxLength={30}
          required
          disabled={formState.isSubmitting}
          testId={`${testId}-input-username`}
        />

        <Input
          control={control}
          type="password"
          name="password"
          label="Password"
          className="mb-4"
          autoComplete="off"
          maxLength={30}
          required
          disabled={formState.isSubmitting}
          testId={`${testId}-input-password`}
        />

        <Button
          type="submit"
          className="my-8 w-full sm:w-40"
          disabled={formState.isSubmitting || !formState.isDirty}
          testId={`${testId}-button-submit`}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
