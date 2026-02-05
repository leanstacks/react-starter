import { cn } from 'common/utils/css';
import Card, { CardProps } from './Card';
import FAIcon, { FAIconProps } from 'common/components/Icon/FAIcon';

/**
 * Properties for the `MessageCard` React component.
 * @param {FAIconProps} [iconProps] - Optional. Icon properties.
 * @param {string} [title] - Optional. A card title.
 * @param {string} message - A card message.
 * @see {@link CardProps}
 */
export interface MessageCardProps extends CardProps {
  iconProps?: FAIconProps;
  title?: string;
  message: string;
}

/**
 * The `MessageCard` component renders a `Card` which conveys a brief message.
 * Useful for informational, warning, error messages, or empty state messages.
 * @param {MessageCardProps} props - Component properties.
 */
const MessageCard = ({ className, iconProps, message, testId = 'card-message', title }: MessageCardProps) => {
  const hasHeader = !!iconProps || !!title;

  return (
    <Card className={cn('w-80', className)} testId={testId}>
      {hasHeader && (
        <Card.Header className="flex items-center justify-center gap-2">
          {iconProps && <FAIcon {...iconProps} testId={`${testId}-icon`} />}
          {title && <Card.Title testId={`${testId}-title`}>{title}</Card.Title>}
        </Card.Header>
      )}
      <Card.Body testId={`${testId}-message`}>{message}</Card.Body>
    </Card>
  );
};

export default MessageCard;
