import { createContext } from 'react';

import { ToastVariants } from '@/common/components/Toast/Toast';

/**
 * Describes the attributes of a single Toast.
 */
export interface ToastDetail extends Pick<ToastVariants, 'variant'> {
  id: string;
  text: string;
  createdAt: string;
  isAutoDismiss: boolean;
}

/**
 * A DTO type which describes the attributes to create a new Toast.
 */
export type CreateToastDTO = Pick<ToastDetail, 'text' | 'isAutoDismiss' | 'variant'>;

/**
 * The `value` provided by the `ToastsContext`.
 */
export interface ToastsContextValue {
  toasts: ToastDetail[];
  createToast: (toast: CreateToastDTO) => void;
  removeToast: (id: string) => void;
}

/**
 * The `ToastsContext` instance.
 */
export const ToastsContext = createContext<ToastsContextValue | undefined>(undefined);
