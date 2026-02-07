import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import Backdrop from '../Backdrop/Backdrop';

/**
 * Defines the shape of the `PopoverContext` value.
 */
type PopoverContextValue = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRect: Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>;
  setTriggerRect: (rect: Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>) => void;
};

/**
 * The `PopoverContext` instance.
 */
const PopoverContext = createContext<PopoverContextValue>({
  isOpen: false,
  setIsOpen: noop,
  triggerRect: { top: 0, left: 0, height: 0, width: 0 },
  setTriggerRect: noop,
});

/**
 * Properties for the `Popover` component.
 */
export interface PopoverProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Popover` component displays content in a floating container that is anchored to a trigger element.
 * It can be used to display tooltips, dropdowns, and other contextual information.
 *
 * **Example:**
 * ```
 * <Popover>
 *   <Popover.Trigger>Click me</Popover.Trigger>
 *   <Popover.Content>Content goes here</Popover.Content>
 * </Popover>
 * ```
 */
const Popover = ({ children, className, testId = 'popover' }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>>({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  return (
    <div className={cn(className)} data-testid={testId}>
      <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRect, setTriggerRect }}>
        {children}
      </PopoverContext.Provider>
    </div>
  );
};

/**
 * The `Trigger` component represents the element that triggers the popover to open or close.
 * It can be any element, such as a button or a link.
 * The `Trigger` component is a child of the `Popover` component.
 */
const Trigger = ({ children, className, testId = 'popover-trigger' }: BaseComponentProps & PropsWithChildren) => {
  const { isOpen, setIsOpen, setTriggerRect } = useContext(PopoverContext);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const updateTriggerRect = () => {
    if (triggerRef.current) {
      const { top, left, height, width } = triggerRef.current.getBoundingClientRect();
      setTriggerRect({ top, left, height, width });
    }
  };

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      window.addEventListener('resize', updateTriggerRect);
      window.addEventListener('scroll', updateTriggerRect);
    } else {
      window.removeEventListener('resize', updateTriggerRect);
      window.removeEventListener('scroll', updateTriggerRect);
    }

    return () => {
      window.removeEventListener('resize', updateTriggerRect);
      window.removeEventListener('scroll', updateTriggerRect);
    };
  }, [isOpen, triggerRef.current]);

  const handleClick = () => {
    updateTriggerRect();
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={cn('hover:cursor-pointer', className)}
      onClick={handleClick}
      ref={triggerRef}
      data-testid={testId}
    >
      {children}
    </button>
  );
};
Popover.Trigger = Trigger;

/**
 * Properties for the `Content` component.
 * @param side - The side of the trigger where the content will be displayed.
 * @param sideOffset - The offset between the trigger and the content in pixels.
 */
interface ContentProps extends BaseComponentProps, PropsWithChildren {
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

/**
 * The `Content` component represents the content of the popover.
 * It is displayed when the popover is open.
 * The `Content` component is a child of the `Popover` component.
 */
const Content = ({
  children,
  className,
  side = 'bottom',
  sideOffset = 8,
  testId = 'popover-content',
}: ContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentRect, setContentRect] = useState<Pick<DOMRect, 'height' | 'width'>>({
    height: 0,
    width: 0,
  });
  const { height: contentHeight, width: contentWidth } = contentRect;
  const { isOpen, setIsOpen, triggerRect } = useContext(PopoverContext);
  const { top: triggerTop, left: triggerLeft, height: triggerHeight, width: triggerWidth } = triggerRect;

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const { height, width } = contentRef.current.getBoundingClientRect();
      setContentRect({ height, width });
    }
  }, [isOpen, contentRef.current]);

  const { top, left } = useMemo(() => {
    switch (side) {
      case 'top':
        return {
          top: triggerTop - contentHeight - sideOffset,
          left: triggerLeft + (triggerWidth - contentWidth) / 2,
        };
      case 'right': {
        return {
          top: triggerTop + (triggerHeight - contentHeight) / 2,
          left: triggerLeft + triggerWidth + sideOffset,
        };
      }
      case 'left': {
        return {
          top: triggerTop + (triggerHeight - contentHeight) / 2,
          left: triggerLeft - contentWidth - sideOffset,
        };
      }
      case 'bottom':
      default: {
        return {
          top: triggerTop + triggerHeight + sideOffset,
          left: triggerLeft + (triggerWidth - contentWidth) / 2,
        };
      }
    }
  }, [triggerTop, triggerLeft, triggerHeight, triggerWidth, contentHeight, contentWidth, side, sideOffset]);

  const isHidden = !isOpen;
  const isVisible = isOpen && contentHeight > 0 && contentWidth > 0;

  return (
    <>
      <Backdrop
        className={cn('bg-transparent', { hidden: isHidden })}
        onClick={() => setIsOpen(false)}
        testId={`${testId}-backdrop`}
      />
      <div
        className={cn('fixed top-0 left-0 z-1001', { hidden: isHidden }, { invisible: !isVisible }, className)}
        style={{ transform: `translate(${left}px, ${top}px)` }}
        ref={contentRef}
        data-testid={testId}
      >
        {children}
      </div>
    </>
  );
};
Popover.Content = Content;

export default Popover;
