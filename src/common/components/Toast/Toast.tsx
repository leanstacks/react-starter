import { useEffect } from 'react';
import dayjs from 'dayjs';
import { animated, useSpring } from '@react-spring/web';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { ToastDetail } from 'common/providers/ToastsContext';
import { useConfig } from 'common/hooks/useConfig';
import Button from 'common/components/Button/Button';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * Defines the component base and variant styles.
 */
const variants = cva('max-w-sm sm:max-w-md rounded-md', {
  variants: {
    variant: {
      danger: 'bg-red-800 text-white',
      info: 'bg-neutral-200 dark:bg-neutral-600',
      success: 'bg-green-800 text-white',
    },
  },
  defaultVariants: { variant: 'info' },
});

/**
 * The variant attributes of the Toast component.
 */
export type ToastVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Toast` component.
 * @param {function} dismiss - A function called when the `Toast` dismisses.
 * @param {ToastDetail} toast - The `Toast`.
 * @see {@link BaseComponentProps}
 */
export interface ToastProps extends BaseComponentProps {
  dismiss: () => void;
  toast: ToastDetail;
}

/**
 * The `Toast` component renders a small, dismissible message to the user.
 *
 * Toast messages are typically used to inform the user of something that
 * happened in the background such as saving information. Or they are
 * used when some adverse action happens, such as an error.
 */
const Toast = ({ className, dismiss, testId = 'toast', toast }: ToastProps): JSX.Element => {
  const config = useConfig();

  const [springs, api] = useSpring(() => ({
    from: { opacity: 1, x: 0 },
  }));

  const doDismiss = (): void => {
    api.start({
      to: { opacity: 0, x: -1000 },
      onRest: () => {
        dismiss();
      },
    });
  };

  useEffect(() => {
    if (toast.isAutoDismiss) {
      const dismissInterval = setInterval(() => {
        const dismissAt = dayjs(toast.createdAt).add(config.VITE_TOAST_AUTO_DISMISS_MILLIS, 'millisecond');
        if (dayjs().isAfter(dismissAt)) {
          doDismiss();
        }
      }, 500);

      return () => clearInterval(dismissInterval);
    }
  }, [toast, config.VITE_TOAST_AUTO_DISMISS_MILLIS]);

  return (
    <animated.div
      className={cn(variants({ variant: toast.variant, className }))}
      data-testid={testId}
      style={{ ...springs }}
    >
      <div className="flex min-h-12 items-center gap-2 p-2">
        <div className="grow text-sm" data-testid={`${testId}-text`}>
          {toast.text}
        </div>
        <Button variant="text" size="icon" onClick={() => doDismiss()} data-testid={`${testId}-button-dismiss`}>
          <FAIcon icon="circleXmark" size="xl" testId={`${testId}-icon-dismiss`} />
        </Button>
      </div>
    </animated.div>
  );
};

export default Toast;
