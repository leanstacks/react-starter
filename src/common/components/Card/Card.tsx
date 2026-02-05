import { ImgHTMLAttributes, PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Divider, { DividerProps } from '../Divider/Divider';

/**
 * Properties for the `Card` React component.
 */
export interface CardProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Card` component renders a container for grouped, related content.
 * 
 * **Example:**
 * ```
  <Card className="w-100" testId="example-card">
    <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
    <Card.Header>
      <Card.Title>Card Title</Card.Title>
      <Card.Subtitle>with a subtitle</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      Nul nostrud non dui elit nul proin. Consectetur magna mi justo dui.
    </Card.Body>
    <Card.Separator />
    <Card.Footer className="text-right text-sm">Read more...</Card.Footer>
  </Card>
 * ```
 */
const Card = ({ children, className, testId = 'card' }: CardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 overflow-hidden rounded-md bg-neutral-500/10 *:not-[img]:px-4 *:first:not-[img]:pt-4 *:last:not-[img]:pb-4',
        className,
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

/**
 * The `Header` is a block within a card. It often contains a Title, Subtitle,
 * or any components located at the top of the card.
 */
const Header = ({ children, className, testId = 'card-header' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Card.Header = Header;

/**
 * The `Body` is a block which encloses the main content of the card.
 */
const Body = ({ children, className, testId = 'card-body' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Card.Body = Body;

/**
 * The `Footer` is a block within a card. It may contain any components located
 * at the bottom of the card.
 */
const Footer = ({ children, className, testId = 'card-footer' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Card.Footer = Footer;

/**
 * The `Image` is an image which is styled for use within a Card. The image will
 * respect the boundaries of the card when used as the first or last child of `Card`.
 */
const Image = ({
  className,
  testId = 'card-image',
  ...props
}: BaseComponentProps & ImgHTMLAttributes<HTMLImageElement>) => {
  return <img className={cn(className)} data-testid={testId} {...props} />;
};
Card.Image = Image;

/**
 * A `Title` for a `Card`.  Typically used within the card `Header`, but not
 * required.
 */
const Title = ({ children, className, testId = 'card-title' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <h5 className={cn('line-clamp-2 text-2xl', className)} data-testid={testId}>
      {children}
    </h5>
  );
};
Card.Title = Title;

/**
 * A `Subtitle` for a `Card`. Typically used within the card `Header`, but not
 * required.
 */
const Subtitle = ({ children, className, testId = 'card-subtitle' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div
      className={cn('line-clamp-2 leading-tight text-neutral-500 font-stretch-condensed', className)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
Card.Subtitle = Subtitle;

/**
 * The `Separator` component renders a horizontal divider.
 * This is useful to organize and separate content.
 */
const Separator = ({ className, testId = 'card-separator' }: DividerProps) => {
  return <Divider className={cn('my-1', className)} testId={testId} />;
};
Card.Separator = Separator;

export default Card;
