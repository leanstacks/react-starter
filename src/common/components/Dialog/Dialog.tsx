import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';
import noop from 'lodash/noop';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Backdrop from '../Backdrop/Backdrop';
import Divider, { DividerProps } from '../Divider/Divider';
import { default as CommonButton, ButtonProps as CommonButtonProps } from '../Button/Button';

/**
 * Defines the properties of the `DialogContext` value.
 */
type DialogContextValue = {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
};

/**
 * The `DialogContext` instance.
 */
const DialogContext = createContext<DialogContextValue>({
  isHidden: true,
  setIsHidden: noop,
});

/**
 * Defines the properties of the `Dialog` render prop function context object.
 * @param close - A function which closes the dialog.
 */
type DialogRenderFnContext = {
  close: () => void;
};

/**
 * The `Dialog` render prop function signature.
 */
type DialogRenderFn = (ctx: DialogRenderFnContext) => ReactNode;

export interface DialogProps extends BaseComponentProps {
  children?: ReactNode | DialogRenderFn;
}

/**
 * A `Dialog` is a modal window that displays on top of the main content,
 * typically asking the user to take an action or confirm a decision.
 * 
 * A Dialog may be composed with regular `children` or accepts a render prop
 * function. The render prop function provides access to the Dialog context
 * attributes.
 * 
 * **Example:**
 * ```
  <Dialog>
    {({ close }) => (
      <>
        <Dialog.Trigger>
          <Button>Review the terms and conditions</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Terms and Conditions</Dialog.Title>
            <Dialog.Subtitle>Please review and accept.</Dialog.Subtitle>
          </Dialog.Header>
          <Dialog.Body>
            Sed qos eiusmod eiusmod at consectetur nam veniam exercitation.
          </Dialog.Body>
          <Dialog.Separator />
          <Dialog.Footer>
            <Dialog.ButtonBar>
              <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
              <Dialog.Button variant="primary">Accept</Dialog.Button>
            </Dialog.ButtonBar>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    )}
  </Dialog>
 * ```
 */
const Dialog = ({ children, className, testId = 'dialog' }: DialogProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const close = () => {
    setIsHidden(true);
  };

  return (
    <div className={cn(className)} data-testid={testId}>
      <DialogContext.Provider value={{ isHidden, setIsHidden }}>
        {typeof children === 'function' ? children({ close }) : children}
      </DialogContext.Provider>
    </div>
  );
};

/**
 * The `Trigger` renders a clickable element used to open a `Dialog`. There
 * should be 1 `Trigger` within a `Dialog`.
 */
const Trigger = ({ children, className, testId = 'dialog-trigger' }: BaseComponentProps & PropsWithChildren) => {
  const { isHidden, setIsHidden } = useContext(DialogContext);

  return (
    <div
      role="button"
      className={cn('cursor-pointer hover:opacity-80', className)}
      onClick={() => setIsHidden(!isHidden)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
Dialog.Trigger = Trigger;

/**
 * The `Content` component wraps the contents of a `Dialog` including the
 * header, body, and footer. There should be 1 `Content` within a `Dialog`.
 */
const Content = ({ children, className, testId = 'dialog-content' }: BaseComponentProps & PropsWithChildren) => {
  const { isHidden, setIsHidden } = useContext(DialogContext);

  return (
    <div className={cn({ hidden: isHidden }, className)} data-testid={testId}>
      <Backdrop
        className="flex items-center justify-center"
        onClick={() => setIsHidden(true)}
        testId={`${testId}-backdrop`}
      >
        <div
          className={cn('bg-light-bg dark:bg-dark-bg m-4 flex max-w-[560px] min-w-72 flex-col gap-4 rounded-md p-6')}
          onClick={(e) => e.stopPropagation()}
          data-testid={`${testId}-content`}
        >
          {children}
        </div>
      </Backdrop>
    </div>
  );
};
Dialog.Content = Content;

/**
 * The `Header` is a block within a dialog `Content` and may contain a `Title`
 * and `Subtitle`.
 */
const Header = ({ children, className, testId = 'dialog-header' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Dialog.Header = Header;

/**
 * The `Body` is a block which encloses the main content of the `Dialog`.
 */
const Body = ({ children, className, testId = 'dialog-body' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Dialog.Body = Body;

/**
 * The `Footer` is a block within a dialog `Content` and contains values such as
 * a `ButtonBar`, `Button`, or any components which are located at the bottom of
 * the `Dialog`.
 */
const Footer = ({ children, className, testId = 'dialog-footer' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Dialog.Footer = Footer;

/**
 * A `Title` for the `Dialog`.  The title is optional.  When present, the `Title`
 * is typically located within the dialog `Header`.
 */
const Title = ({ children, className, testId = 'dialog-title' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <h5 className={cn('line-clamp-2 text-2xl', className)} data-testid={testId}>
      {children}
    </h5>
  );
};
Dialog.Title = Title;

/**
 * A `Subtitle` for the `Dialog`. The subtitle is optional. When present, the
 * `Subtitle` is typically located within the dialog `Header`, immediately after
 * the `Title`.
 */
const Subtitle = ({ children, className, testId = 'dialog-subtitle' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div
      className={cn('line-clamp-2 leading-tight text-neutral-500 font-stretch-condensed', className)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
Dialog.Subtitle = Subtitle;

/**
 * A `ButtonBar` organizes one to many dialog `Button` components in a horizontal
 * row.  The buttons are right justified within the bar.
 */
const ButtonBar = ({ children, className, testId = 'dialog-button-bar' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn('flex items-center justify-end gap-4', className)} data-testid={testId}>
      {children}
    </div>
  );
};
Dialog.ButtonBar = ButtonBar;

/**
 * Define the `Button` component base and variant styles.
 */
const buttonVariants = cva('', {
  variants: {
    variant: {
      danger: 'font-bold text-red-600',
      primary: 'font-bold text-blue-600 dark:text-blue-400',
      secondary: '',
    },
  },
  defaultVariants: { variant: 'secondary' },
});

/**
 * The variant attributes of the `Button` component.
 */
type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Properties for the `Button` component.
 */
export interface ButtonProps extends Omit<CommonButtonProps, 'variant'>, ButtonVariants {}

/**
 * A dialog `Button` is a button which is styles for presentation within a
 * `Dialog`.
 */
const Button = ({ className, variant = 'secondary', testId = 'dialog-button', ...props }: ButtonProps) => {
  return (
    <CommonButton
      variant="text"
      size="sm"
      className={cn(buttonVariants({ variant, className }))}
      testId={testId}
      {...props}
    />
  );
};
Dialog.Button = Button;

/**
 * The `Separator` component renders a horizontal divider.
 * This is useful to organize and separate content.
 */
const Separator = ({ className, testId = 'dialog-separator' }: DividerProps) => {
  return <Divider className={cn('my-1', className)} testId={testId} />;
};
Dialog.Separator = Separator;

export default Dialog;
